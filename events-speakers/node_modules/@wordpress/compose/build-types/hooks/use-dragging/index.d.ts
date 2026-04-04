/**
 * @param {Object}                        props
 * @param {(e: React.MouseEvent) => void} props.onDragStart
 * @param {(e: MouseEvent) => void}       props.onDragMove
 * @param {(e?: MouseEvent) => void}      props.onDragEnd
 */
export default function useDragging({ onDragStart, onDragMove, onDragEnd }: {
    onDragStart: (e: React.MouseEvent) => void;
    onDragMove: (e: MouseEvent) => void;
    onDragEnd: (e?: MouseEvent) => void;
}): {
    startDrag: (e: React.MouseEvent) => void;
    endDrag: (e?: MouseEvent) => void;
    isDragging: boolean;
};
//# sourceMappingURL=index.d.ts.map