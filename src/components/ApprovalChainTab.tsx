import { useState } from 'react'
import { approvalChainStreams, type ApprovalChainComment } from '../data/approvalChain'

const GROUP_HEADS_KEY = 'groupHeads'

interface ApprovalChainTabProps {
  onBack: () => void
  comment: string
  onCommentChange: (value: string) => void
  onApprove: () => void
  onReject: () => void
  groupHeadComments?: ApprovalChainComment[]
}

function CommentCard({ title, entry }: { title: string; entry: ApprovalChainComment }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-slate-900">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{entry.date}</span>
          {entry.approved && (
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-white">Approved</span>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-600">{entry.comment}</p>
    </div>
  )
}

export default function ApprovalChainTab({
  onBack,
  comment,
  onCommentChange,
  onApprove,
  onReject,
  groupHeadComments = [],
}: ApprovalChainTabProps) {
  const [activeStream, setActiveStream] = useState<string>(approvalChainStreams[0].key)
  const stream = approvalChainStreams.find((s) => s.key === activeStream)
  const showGroupHeadsTab = groupHeadComments.length > 0

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Approval Chain Comments</h2>
        <p className="mt-1 text-sm text-slate-500">
          View all comments from makers, checkers, and group heads in the approval workflow
        </p>

        <div className="mt-5 flex gap-6 border-b border-slate-200">
          {approvalChainStreams.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveStream(s.key)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
                activeStream === s.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {s.label}
            </button>
          ))}
          {showGroupHeadsTab && (
            <button
              type="button"
              onClick={() => setActiveStream(GROUP_HEADS_KEY)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
                activeStream === GROUP_HEADS_KEY ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Group Heads
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {activeStream === GROUP_HEADS_KEY
            ? groupHeadComments.map((entry) => <CommentCard key={entry.author} title={entry.author} entry={entry} />)
            : stream && (
                <>
                  <CommentCard title={stream.reviewerTitle} entry={stream.reviewerComment} />
                  <CommentCard title={stream.unitHeadTitle} entry={stream.unitHeadComment} />
                </>
              )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-bold text-slate-900">Comment</h3>
        <p className="mt-1 text-sm text-slate-500">Review all approval chain comments above and provide your decision</p>

        <label htmlFor="group-head-comment" className="mt-5 block text-sm font-semibold text-slate-800">
          Comments <span className="text-red-500">*</span>
        </label>
        <textarea
          id="group-head-comment"
          rows={4}
          placeholder="Provide your comments on this vendor assessment. Your feedback will be recorded in the approval chain..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onReject}
            disabled={!comment.trim()}
            className="rounded-lg border border-brand-600 bg-white px-6 py-2.5 font-semibold text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={!comment.trim()}
            className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}
