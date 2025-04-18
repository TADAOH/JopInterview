import Link from "next/link";
import { InterviewJson } from "../../interface";

const DeleteInterviewCatalog = ({ interviewsJson }: { interviewsJson: InterviewJson }) => {
    if (!interviewsJson || !Array.isArray(interviewsJson.data)) {
        return <p className="text-red-500">No interviews found.</p>;
    }

    return (
        <>
            <span className="text-black">
                {interviewsJson.count} scheduled interviews to delete
            </span>
            <div className="m-5 flex flex-wrap justify-around p-5">
                {interviewsJson.data.map((interview) => (
                    <Link href={`/deleteinterview/${interview._id}`} key={interview._id} className="w-1/4 px-5 py-3">
                        <div className="p-4 border rounded-lg shadow-md bg-white">
                            <h2 className="text-lg font-semibold">
                                {interview.company?.name || "Unknown Company"}
                            </h2>
                            <p>Date: {new Date(interview.intwDate).toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default DeleteInterviewCatalog;