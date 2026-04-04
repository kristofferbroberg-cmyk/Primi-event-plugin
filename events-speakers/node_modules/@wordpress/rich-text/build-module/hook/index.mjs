// packages/rich-text/src/hook/index.js
import { useRef, useLayoutEffect, useReducer } from "@wordpress/element";
import { useMergeRefs, useRefEffect } from "@wordpress/compose";
import { useRegistry } from "@wordpress/data";
import deprecated from "@wordpress/deprecated";
import { create, RichTextData } from "../create.mjs";
import { apply } from "../to-dom.mjs";
import { toHTMLString } from "../to-html-string.mjs";
import { removeFormat } from "../remove-format.mjs";
import { useDefaultStyle } from "./use-default-style.mjs";
import { useBoundaryStyle } from "./use-boundary-style.mjs";
import { useEventListeners } from "./event-listeners/index.mjs";
import { useFormatTypes } from "./use-format-types.mjs";
function useRichTextBase({
  value = "",
  selectionStart,
  selectionEnd,
  placeholder,
  onSelectionChange,
  preserveWhiteSpace,
  onChange,
  __unstableDisableFormats: disableFormats,
  __unstableIsSelected: isSelected,
  __unstableDependencies = [],
  __unstableAfterParse,
  __unstableBeforeSerialize,
  __unstableAddInvisibleFormats
}) {
  const registry = useRegistry();
  const [, forceRender] = useReducer(() => ({}));
  const ref = useRef();
  function createRecord() {
    const {
      ownerDocument: { defaultView }
    } = ref.current;
    const selection = defaultView.getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    return create({
      element: ref.current,
      range,
      __unstableIsEditableTree: true
    });
  }
  function applyRecord(newRecord, { domOnly } = {}) {
    apply({
      value: newRecord,
      current: ref.current,
      prepareEditableTree: __unstableAddInvisibleFormats,
      __unstableDomOnly: domOnly,
      placeholder
    });
  }
  const _valueRef = useRef(value);
  const recordRef = useRef();
  function setRecordFromProps() {
    const activeFormats = recordRef.current?.activeFormats;
    _valueRef.current = value;
    recordRef.current = value;
    if (!(value instanceof RichTextData)) {
      recordRef.current = value ? RichTextData.fromHTMLString(value, { preserveWhiteSpace }) : RichTextData.empty();
    }
    recordRef.current = {
      text: recordRef.current.text,
      formats: recordRef.current.formats,
      replacements: recordRef.current.replacements,
      activeFormats
    };
    if (disableFormats) {
      recordRef.current.formats = Array(value.length);
      recordRef.current.replacements = Array(value.length);
    }
    if (__unstableAfterParse) {
      recordRef.current.formats = __unstableAfterParse(
        recordRef.current
      );
    }
    recordRef.current.start = selectionStart;
    recordRef.current.end = selectionEnd;
  }
  const hadSelectionUpdateRef = useRef(false);
  if (!recordRef.current) {
    hadSelectionUpdateRef.current = isSelected;
    setRecordFromProps();
  } else if (selectionStart !== recordRef.current.start || selectionEnd !== recordRef.current.end) {
    hadSelectionUpdateRef.current = isSelected;
    recordRef.current = {
      ...recordRef.current,
      start: selectionStart,
      end: selectionEnd,
      activeFormats: void 0
    };
  }
  function handleChange(newRecord) {
    recordRef.current = newRecord;
    applyRecord(newRecord);
    if (disableFormats) {
      _valueRef.current = newRecord.text;
    } else {
      const newFormats = __unstableBeforeSerialize ? __unstableBeforeSerialize(newRecord) : newRecord.formats;
      newRecord = { ...newRecord, formats: newFormats };
      if (typeof value === "string") {
        _valueRef.current = toHTMLString({
          value: newRecord,
          preserveWhiteSpace
        });
      } else {
        _valueRef.current = new RichTextData(newRecord);
      }
    }
    const { start, end, formats, text } = recordRef.current;
    registry.batch(() => {
      onSelectionChange(start, end);
      onChange(_valueRef.current, {
        __unstableFormats: formats,
        __unstableText: text
      });
    });
    forceRender();
  }
  function applyFromProps() {
    const previousValue = _valueRef.current;
    setRecordFromProps();
    const contentLengthChanged = previousValue && typeof previousValue === "string" && typeof value === "string" && previousValue.length !== value.length;
    const hasFocus = ref.current?.contains(
      ref.current.ownerDocument.activeElement
    );
    const skipSelection = contentLengthChanged && !hasFocus;
    applyRecord(recordRef.current, { domOnly: skipSelection });
  }
  const didMountRef = useRef(false);
  useLayoutEffect(() => {
    if (didMountRef.current && value !== _valueRef.current) {
      applyFromProps();
      forceRender();
    }
  }, [value]);
  useLayoutEffect(() => {
    if (!hadSelectionUpdateRef.current) {
      return;
    }
    if (ref.current.ownerDocument.activeElement !== ref.current) {
      ref.current.focus();
    }
    applyRecord(recordRef.current);
    hadSelectionUpdateRef.current = false;
  }, [hadSelectionUpdateRef.current]);
  const mergedRefs = useMergeRefs([
    ref,
    useDefaultStyle(),
    useBoundaryStyle({ record: recordRef }),
    useEventListeners({
      record: recordRef,
      handleChange,
      applyRecord,
      createRecord,
      isSelected,
      onSelectionChange,
      forceRender
    }),
    useRefEffect(() => {
      applyFromProps();
      didMountRef.current = true;
    }, [placeholder, ...__unstableDependencies])
  ]);
  return {
    value: recordRef.current,
    // A function to get the most recent value so event handlers in
    // useRichText implementations have access to it. For example when
    // listening to input events, we internally update the state, but this
    // state is not yet available to the input event handler because React
    // may re-render asynchronously.
    getValue: () => recordRef.current,
    onChange: handleChange,
    ref: mergedRefs
  };
}
function useRichText({
  allowedFormats,
  withoutInteractiveFormatting,
  onChange,
  __unstableDependencies = [],
  __unstableFormatTypeHandlerContext,
  ...props
}) {
  const {
    formatTypes,
    prepareHandlers,
    valueHandlers,
    changeHandlers,
    dependencies
  } = useFormatTypes({
    allowedFormats,
    withoutInteractiveFormatting,
    __unstableFormatTypeHandlerContext
  });
  function addEditorOnlyFormats(record) {
    return valueHandlers.reduce(
      (accumulator, fn) => fn(accumulator, record.text),
      record.formats
    );
  }
  function removeEditorOnlyFormats(record) {
    formatTypes.forEach((formatType) => {
      if (formatType.__experimentalCreatePrepareEditableTree) {
        record = removeFormat(
          record,
          formatType.name,
          0,
          record.text.length
        );
      }
    });
    return record.formats;
  }
  function addInvisibleFormats(record) {
    return prepareHandlers.reduce(
      (accumulator, fn) => fn(accumulator, record.text),
      record.formats
    );
  }
  const result = useRichTextBase({
    ...props,
    onChange(value, { __unstableFormats, __unstableText }) {
      onChange(value, { __unstableFormats, __unstableText });
      Object.values(changeHandlers).forEach((changeHandler) => {
        changeHandler(__unstableFormats, __unstableText);
      });
    },
    __unstableDependencies: [...dependencies, ...__unstableDependencies],
    __unstableAfterParse: addEditorOnlyFormats,
    __unstableBeforeSerialize: removeEditorOnlyFormats,
    __unstableAddInvisibleFormats: addInvisibleFormats
  });
  return { ...result, formatTypes };
}
function __unstableUseRichText(props) {
  deprecated("`__unstableUseRichText` hook", {
    since: "7.0"
  });
  return useRichTextBase(props);
}
export {
  __unstableUseRichText,
  useRichText
};
//# sourceMappingURL=index.mjs.map
