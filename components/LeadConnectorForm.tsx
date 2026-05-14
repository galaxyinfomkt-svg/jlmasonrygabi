type Props = {
  height?: number | string;
  className?: string;
  title?: string;
};

const FORM_ID = "Xsr3o2zQhIeWZNqQqd66";

export default function LeadConnectorForm({
  height = 600,
  className = "",
  title = "Request a Free Masonry Estimate",
}: Props) {
  return (
    <div className={className}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
        style={{
          width: "100%",
          height: typeof height === "number" ? `${height}px` : height,
          border: "none",
          borderRadius: "3px",
        }}
        id={`inline-${FORM_ID}`}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Form 0"
        data-height="488"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        title={title}
      />
    </div>
  );
}
