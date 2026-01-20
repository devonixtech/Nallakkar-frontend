import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { toast } from "react-toastify";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get("/admin/notifications");
            // Assuming backend returns { success: true, data: [...] }
            if (res.data?.success) {
                setNotifications(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <>
            <Helmet>
                <title>Notifications - Admin Dashboard</title>
            </Helmet>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    <button
                        onClick={fetchNotifications}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Refresh
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <i className="ri-notification-off-line text-4xl mb-2 block"></i>
                            No notifications found.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {notifications.map((notif) => (
                                <div key={notif.id} className={`p-4 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-blue-50' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-full ${notif.type === 'claim_request' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <i className={notif.type === 'claim_request' ? "ri-money-dollar-circle-line text-xl" : "ri-notification-3-line text-xl"}></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-medium">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(notif.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
