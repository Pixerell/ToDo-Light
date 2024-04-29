// Я решил сделать два разных массива с задачами
// Выполненные/Не выполненные, затем их просто комбинируем в один массив и сортируем по дате
// Это решение было принято потому что хотелось чёткого разделения по статусу у задач, так как мы их показываем как раз в зависимости от статуса
// А так же это оптимизирование, так как фильтрация по статусу из одного массива довольно ресурсозатратна (особенно если задач будет тысячи и миллионы)
// По умолчанию каждая новая задача отправляется в массив pending, а каждое нажатие на выполнение отправляет в массив с completed
// Чтобы избежать дубликатов айдишек при конкатанации двух массивов я решил генерировать их с помощью алгоритма UUIDv4


export const STATUS_SUCCESS = "Completed"
export const STATUS_PENDING = "Pending"
export const STATUS_ALL = "All"

export interface TaskProps {
    id:string,
    taskDescription:string,
    status:string
    date:string,
}

export let pendingTasks: Array<TaskProps> = [
    {
        id: "3bb0pb69-573b-49a6-8c6e-d0693e1f4385",
        taskDescription: "Complete project proposal",
        status: "Pending",
        date: "19.04.19 10:30:00",
    },
    {
        id: "bc84o3d1-3c54-48fa-915c-6d9307c442fd",
        taskDescription: "Prepare presentation slides",
        status: "Pending",
        date: "19.04.20 09:15:00",
    },
    {
        id: "2e09ib91-9686-430f-8f2e-b9dd423b6595",
        taskDescription: "Review project documentation",
        status: "Pending",
        date: "20.04.18 15:00:00",
    },
    {
        id: "b1d8u830-ddc5-4aa9-b2d1-0d3d14cb32d5",
        taskDescription: "Meeting with team",
        status: "Pending",
        date: "21.04.21 14:00:00",
    },
    {
        id: "d2f2y939-f97f-4b2e-a3cb-a9474eab18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52t901-d26b-431c-be7f-c2c92cb8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ae85f-5de6-4e75-b086-b6835d92b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "3bb0wb69-573b-49a6-8c6e-d0693e1f4385",
        taskDescription: "Complete project proposal",
        status: "Pending",
        date: "19.04.19 10:30:00",
    },
    {
        id: "bc84m3d1-3c54-48fa-915c-6d9307c442fd",
        taskDescription: "Prepare presentation slides",
        status: "Pending",
        date: "19.04.20 09:15:00",
    },
    {
        id: "2e09nb91-9686-430f-8f2e-b9dd423b6595",
        taskDescription: "Review project documentation",
        status: "Pending",
        date: "20.04.18 15:00:00",
    },
    {
        id: "b1d8l830-ddc5-4aa9-b2d1-0d3d14hb32d5",
        taskDescription: "Meeting with team",
        status: "Pending",
        date: "21.04.21 14:00:00",
    },
    {
        id: "d2f2j939-f97f-4b2e-a3cb-a9474egb18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52q901-d26b-431c-be7f-c2c92cf8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4e75-b086-b6835dd2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "d2f2j939-f97f-4b2e-a3cb-a9474esb18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52q901-d26b-431c-be7f-c2c92ca8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4e75-b086-b6835dm2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "d2f2j939-f97f-4bce-a3cb-a9474enb18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52q901-d26b-43xc-be7f-c2c92cb8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4ez5-b086-b6835dv2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "d2f2j939-f97f-4bae-a3cb-a9474ecb18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52q901-d26b-43oc-be7f-c2c92cx8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4ei5-b086-b6835dz2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4eu5-b086-b6835dm2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "d2f2j939-f97f-4bye-a3cb-a9474enb18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52q901-d26b-43tc-be7f-c2c92cb8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4er5-b086-b6835dv2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "d2f2j939-f97f-4bee-a3cb-a9474ecb18d2",
        taskDescription: "Update website content",
        status: "Pending",
        date: "22.04.17 11:45:00",
    },
    {
        id: "0d52q901-d26b-43wc-be7f-c2c92cx8b53b",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
    {
        id: "029ab85f-5de6-4eq5-b086-b6835dz2b7d8",
        taskDescription: "Update website content",
        status: "Pending",
        date: "23.04.17 11:45:00",
    },
];

export let completedTasks: Array<TaskProps> = [
    {
        id: "379cf77f-aa17-43c3-ab3b-e2139efa66e4",
        taskDescription: "Finish project proposal",
        status: "Completed",
        date: "22.04.19 10:30:00",
    },
    {
        id: "a20b3056-5cde-473e-89bd-b1b9178d68f1",
        taskDescription: "Review presentation slides",
        status: "Completed",
        date: "22.04.20 09:15:00",
    },
];

export let tempTasks: Array<TaskProps> = [];
