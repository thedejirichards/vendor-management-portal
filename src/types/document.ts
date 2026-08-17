export interface VendorFile {
  name: string
  fileType: string
  sizeLabel: string
  uploadedLabel: string
  expiresLabel?: string
}

export interface DocumentCategory {
  title: string
  subtitle: string
  files: VendorFile[]
}

export interface DocumentVersion {
  name: string
  uploadedLabel: string
  sizeLabel: string
}

export interface DocumentComparisonItem {
  docId: string
  title: string
  existing: DocumentVersion
  updated: DocumentVersion | null
}
