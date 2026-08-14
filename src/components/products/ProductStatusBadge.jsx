import { CheckCircle2, AlertTriangle, Clock, AlertOctagon, XCircle } from 'lucide-react'
import Badge from '../common/Badge'
import { EXPIRY_STATUS, getStatusColor, getStatusLabel } from '../../utils/expiryUtils'

const ICONS = {
  [EXPIRY_STATUS.SAFE]: CheckCircle2,
  [EXPIRY_STATUS.WARNING]: AlertTriangle,
  [EXPIRY_STATUS.EXPIRING_SOON]: Clock,
  [EXPIRY_STATUS.EXPIRES_TODAY]: AlertOctagon,
  [EXPIRY_STATUS.EXPIRED]: XCircle
}

export default function ProductStatusBadge({ status, className = '' }) {
  if (!status) return null
  return (
    <Badge color={getStatusColor(status)} icon={ICONS[status]} className={className}>
      {getStatusLabel(status).toUpperCase()}
    </Badge>
  )
}
