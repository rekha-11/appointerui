import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "../pages/sidebar/Sidebar";
import { getUser } from "../slices/user";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "./routes.scss";

export default function Private({ children }: { children: JSX.Element }) {
  const user = useAppSelector((state) => state.user.id);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    (async () => {
      if (!user) {
        dispatch(getUser());
      }
    })();
  }, [user, dispatch]);

  if (!user && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user && token) {
    return <CircularProgress />;
  }

  return (
    <div className="privateroute_root">
      <Sidebar />
      <Box
        width="100%"
        height="calc(100vh - 64px)"
        sx={{ overFlowY: "auto", mt: "64px", pt: "32px", pl: "32px" }}
      >
        {children}
      </Box>
    </div>
  );
}

// export default function Private({ children }: { children: JSX.Element }) {
//   const user = useAppSelector((state) => state.auth.id);
//   const token = useAppSelector((state) => state.auth.token);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const [getUser, { isLoading, isError, error }] = useGetUserMutation();

//   React.useEffect(() => {
//     (async () => {
//       try {
//         if (!user && token) {
//           await getUser().unwrap();
//         }
//       } catch (e) {
//         dispatch(
//           addToastNotification({
//             variant: "error",
//             message:
//               (e as { status: number }).status === 401
//                 ? "Your session has expired! Please login again!"
//                 : "Failed to fetch account! Something went wrong!",
//             autoTimeout: true
//           })
//         );
//       }
//     })();
//   }, [user, token]);

//   if (
//     (!user && !token) ||
//     (isError && error && "status" in error && error.status === 401)
//   ) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (isLoading || !user) {
//     return (
//       <Box
//         width="100%"
//         display="flex"
//         justifyContent="center"
//         height="100vh"
//         alignItems="center"
//       >
//         {isLoading ? (
//           <CircularProgress />
//         ) : (
//           <Typography textAlign="center">
//             Sorry! Something went wrong! <br />
//             Please contact application administrator at <b>+977 9818683569</b>
//           </Typography>
//         )}
//       </Box>
//     );
//   }

//   return (
//     <div className="privateroute_root">
//       <Sidebar />
//       <Box
//         width="100%"
//         height="calc(100vh - 64px)"
//         sx={{ overFlowY: "auto", mt: "64px" }}
//       >
//         {children}
//       </Box>
//     </div>
//   );
// }
