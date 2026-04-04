// packages/dataviews/src/hooks/use-report-validity.ts
import { useEffect } from "@wordpress/element";
function useReportValidity(ref, shouldReport) {
  useEffect(() => {
    if (shouldReport && ref.current) {
      const inputs = ref.current.querySelectorAll(
        "input, textarea, select"
      );
      inputs.forEach((input) => {
        input.reportValidity();
      });
    }
  }, [shouldReport, ref]);
}
export {
  useReportValidity as default
};
//# sourceMappingURL=use-report-validity.mjs.map
