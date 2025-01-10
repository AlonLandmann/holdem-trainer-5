import { useUserData } from "@/hooks/useUserData";
import { withSeparators } from "@/lib/display";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function weeksAgo(date) {
    const inputDate = new Date(date);
    const now = new Date();

    // Set now to the start of the current week (Monday 00:00)
    const currentWeekStart = new Date(now);
    const dayOfWeek = currentWeekStart.getDay(); // Sunday is 0, Monday is 1, etc.
    const diffToMonday = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1; // Adjust for Monday
    currentWeekStart.setDate(currentWeekStart.getDate() - diffToMonday);
    currentWeekStart.setHours(0, 0, 0, 0);

    // Set input date to the start of its day (remove time component)
    inputDate.setHours(0, 0, 0, 0);

    // Calculate the difference in time
    const diffInMs = currentWeekStart - inputDate;
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;

    // If the difference is negative or zero, it's this week
    if (diffInMs <= 0) return 0;

    // Otherwise, calculate the number of weeks ago
    return Math.ceil(diffInMs / msPerWeek);
}

function populateUsers(trainingSessions) {
    const users = {};

    for (const trainingSession of trainingSessions) {
        if (!(String(trainingSession.userId) in users)) {
            // users[String(trainingSession.userId)] = Array(weeksAgo(trainingSession.user.createdAt) + 1).fill(0);
            users[String(trainingSession.userId)] = {
                byWeeks: Array(Math.max(weeksAgo(trainingSession.user.createdAt), weeksAgo(trainingSession.createdAt)) + 1).fill(0),
                total: 0,
                email: trainingSession.user.email,
            };
        }

        for (const trainingUnit of trainingSession.trainingUnits) {
            if (trainingUnit.complexity === 0) {
                continue;
            }

            // if (weeksAgo(trainingSession.createdAt) > weeksAgo(trainingSession.user.createdAt)) {
            //     // console.log(trainingSession.user.email, trainingSession.user.createdAt);
            // }

            users[String(trainingSession.userId)].byWeeks[weeksAgo(trainingSession.createdAt)] += trainingUnit.total;
            users[String(trainingSession.userId)].total += trainingUnit.total;
        }
    }

    return users;
}

export default function AdminRoot() {
    const [user, loaded] = useUserData();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (loaded.initialComplete && (!user.info || user.info.role !== "admin")) {
            window.location = "/auth/login";
        }
    }, [loaded.initialComplete]);

    useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        const res = await fetch("/api/logs/admin-data");
        const json = await res.json();

        if (json.success) {
            setUsers(populateUsers(json.trainingSessions));
        } else {
            toast.error(json.message || "An unexpected error occurred.");
        }
    }

    return !user.info ? null : (
        <div className="min-h-screen bg-white text-gray-800 p-4 overflow-x-auto">
            {users && Object.keys(users).toReversed().map(userIdStr => (
                <div key={userIdStr} className="flex gap-10 flex-nowrap">
                    <div className="min-w-52 max-w-52 truncate">
                        {users[userIdStr].email}
                    </div>
                    <div className="min-w-20 truncate text-right">
                        {withSeparators(users[userIdStr].total)}
                    </div>
                    <div className="min-w-10 truncate text-right">
                        {users[userIdStr].byWeeks[0] || "-"}
                    </div>
                    <div className="min-w-10 truncate text-right">
                        {users[userIdStr].byWeeks[1] || "-"}
                    </div>
                    {users[userIdStr].byWeeks.slice(2).map((n, i) => (
                        <div key={userIdStr + "-" + i} className="min-w-10 truncate text-right">
                            {n || "-"}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};