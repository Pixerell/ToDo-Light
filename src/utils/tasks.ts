// По факту нужно всего два массива с задачами
// Выполненные/Не выполненные, затем их просто комбинируем в один массив и сортируем по дате

export const STATUS_SUCCESS = "Completed"
export const STATUS_PENDING = "Pending"

export let tasks = [
    {
        id: 1,
        taskDescription: "Complete project proposal",
        status: "Pending",
        date: "22.04.19 10:30:00",
    },
    {
        id: 2,
        taskDescription: "Prepare presentation slides",
        status: "Pending",
        date: "22.04.20 09:15:00",
    },
    {
        id: 3,
        taskDescription: "Review project documentation",
        status: "Completed",
        date: "22.04.18 15:00:00",
    },
    {
        id: 4,
        taskDescription: "Meeting with team",
        status: "Pending",
        date: "22.04.21 14:00:00",
    },
    {
        id: 5,
        taskDescription: "Update website content",
        status: "Completed",
        date: "22.04.17 11:45:00",
    },
    {
        id: 6,
        taskDescription: "Plan marketing campaign",
        status: "Pending",
        date: "22.04.20 16:30:00",
    },
    {
        id: 7,
        taskDescription: "Create new product mockups",
        status: "Pending",
        date: "22.04.18 08:00:00",
    },
    {
        id: 8,
        taskDescription: "Attend client meeting",
        status: "Pending",
        date: "22.04.19 13:00:00",
    },
    {
        id: 9,
        taskDescription: "Send progress report",
        status: "Pending",
        date: "22.04.20 12:00:00",
    },
    {
        id: 10,
        taskDescription: "Prepare budget proposal",
        status: "Completed",
        date: "22.04.16 09:30:00",
    },
    {
        id: 11,
        taskDescription: "Conduct user research",
        status: "Pending",
        date: "22.04.21 10:00:00",
    },
    {
        id: 12,
        taskDescription: "Review market analysis",
        status: "Completed",
        date: "22.04.15 14:45:00",
    },
    {
        id: 13,
        taskDescription: "Organize team workshop",
        status: "Pending",
        date: "22.04.22 08:30:00",
    },
    {
        id: 14,
        taskDescription: "Finalize project timeline",
        status: "Pending",
        date: "22.04.23 16:15:00",
    },
    {
        id: 15,
        taskDescription: "Create social media content",
        status: "Pending",
        date: "22.04.24 09:45:00",
    },
];
