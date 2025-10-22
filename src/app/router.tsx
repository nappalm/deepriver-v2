import { HOME_PATHS, homeRoutes } from "@/features/home";
import { SETTINGS_PATHS, settingsRoutes } from "@/features/settings";

import { BaseLayout, SettingsLayout } from "@/shared";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

/**
 * @constant appRoutes
 * @description Main application routes.
 * These routes are rendered within the main Layout, which includes the navigation bar and other shared components.
 */
const appRoutes = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: HOME_PATHS.base,
        children: homeRoutes,
      },
      {
        path: "*",
        element: <Navigate to={HOME_PATHS.base} replace />,
      },
    ],
  },
];

/**
 * @constant settingRoutes
 * @description Settings section routes.
 * These routes are rendered within the SettingsLayout, which is specific to the settings section of the application.
 */
const settingRoutes = [
  {
    element: <SettingsLayout />,
    children: [
      {
        path: SETTINGS_PATHS.base,
        children: settingsRoutes,
      },
      {
        path: "*",
        element: <Navigate to={HOME_PATHS.base} replace />,
      },
    ],
  },
];

/**
 * @constant routerConfiguration
 * @description The main router configuration for the application.
 */
const routerConfiguration = [...appRoutes, ...settingRoutes];

const router = createBrowserRouter(routerConfiguration);

export default function Router() {
  return <RouterProvider router={router} />;
}
