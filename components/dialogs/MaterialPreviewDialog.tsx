import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MaterialPreviewDialog = ({
  title,
  fileUrl,
}: {
  title: string;
  fileUrl: string;
}) => {
  const viewerSrc = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
    fileUrl
  )}`;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="custom-btn">Preview Material</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[80vw] h-[80vh] max-w-none flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b pb-4 bg-white">
          <AlertDialogTitle className="text-xl font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogCancel>
            <X />
          </AlertDialogCancel>
        </div>
        <div className="flex-1 w-full bg-white">
          <iframe
            src={viewerSrc}
            title={`Preview: ${title}`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MaterialPreviewDialog;
