import AddCruiseForm from "@/components/admin/cruise/AddCruiseForm";
import EditCruiseForm from "@/components/admin/cruise/EditCruiseForm";
import TrashCruise from "@/components/admin/cruise/TrashCruise";
import AddRoomForm from "@/components/admin/room/AddRoomForm";
import EditRoomForm from "@/components/admin/room/EditRoomForm";
import TrashRoom from "@/components/admin/room/TrashRoom";
import AdminLayout from "@/layouts/admin/AdminLayout";
import ClientLayout from "@/layouts/client/ClientLayout";
import CruisesPage from "@/pages/admin/cruise/CruisePage";

import Dashboard from "@/pages/admin/dashboard/Dashboard";
import RoomPage from "@/pages/admin/room/RoomPage";
import DetailTour from "@/pages/client/detailTour/DetailTour";
import Home from "@/pages/client/home/Home";
import routes from "@/routes/routes";

export const clientRoutes = [
	{ path: routes.home, layout: ClientLayout, element: Home },
	{ path: routes.detailTour, layout: ClientLayout, element: DetailTour },
];
export const adminRoutes = [
	{ path: routes.dashboard, layout: AdminLayout, element: Dashboard },
	{ path: routes.cruiseList, layout: AdminLayout, element: CruisesPage },
	{ path: routes.addCruise, layout: AdminLayout, element: AddCruiseForm },
	{ path: routes.editCruise, layout: AdminLayout, element: EditCruiseForm },
	{ path: routes.trashCruise, layout: AdminLayout, element: TrashCruise },
	{ path: routes.roomList, layout: AdminLayout, element: RoomPage },
	{ path: routes.addRoom, layout: AdminLayout, element: AddRoomForm },
	{ path: routes.editRoom, layout: AdminLayout, element: EditRoomForm },
	{ path: routes.trashRoom, layout: AdminLayout, element: TrashRoom },
];
