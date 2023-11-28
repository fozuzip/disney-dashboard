import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FileDown } from "lucide-react";

import { Button } from "./button";

interface DownloadButtonProps {
  data?: XLSX.WorkSheet[];
}

export const DownloadButton = ({ data }: DownloadButtonProps) => {
  const downloadDataAsXLSX = () => {
    if (!data) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const xlsxBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([xlsxBuffer], { type: "application/octet-stream" });
    saveAs(blob, "pie-chart-data.xlsx");
  };

  return (
    <Button
      className="bg-background"
      onClick={downloadDataAsXLSX}
      disabled={!data}
    >
      <div className="flex items-center gap-x-2">
        <FileDown className="w-4 h-4" />
        <span>Download</span>
      </div>
    </Button>
  );
};
