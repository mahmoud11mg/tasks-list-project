import {Status} from '@prisma/client';
interface StatusBageProps  {
    status : Status;

}

const StatusBage = ({status}:StatusBageProps) => {
    const statusColor = status === Status.TODO 
    ? "bg-red-400 text-red-950 "
    : status === Status. IN_PROGRESS 
    ? "bg-yellow-500 text-yellow-950"
    : "bg-green-600 text-green-950";

  return (
    <div className={`${statusColor} py-1 px-2 w-min rounded-lg font-semibold`} >
        {status.toString()}
    </div>
  )
}

export default StatusBage