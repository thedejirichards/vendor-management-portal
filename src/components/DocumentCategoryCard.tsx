import { FileText, File, Download, Eye } from 'lucide-react'
import type { DocumentCategory } from '../types/document'

export default function DocumentCategoryCard({ category }: { category: DocumentCategory }) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-4">
        <FileText className="h-5 w-5 text-slate-600" />
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-extrabold text-slate-900">{category.title}</h3>
          <p className="text-sm text-slate-500">{category.subtitle}</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {category.files.map((file) => (
          <div key={file.name} className="flex items-center justify-between gap-4 py-2.5">
            <div className="flex items-start gap-3">
              <File className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-900">{file.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {file.fileType}
                  <span className="mx-1.5">&middot;</span>
                  {file.sizeLabel}
                  <span className="mx-1.5">&middot;</span>
                  Uploaded: {file.uploadedLabel}
                  {file.expiresLabel && (
                    <>
                      <span className="mx-1.5">&middot;</span>
                      Expires: {file.expiresLabel}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                Uploaded
              </span>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
