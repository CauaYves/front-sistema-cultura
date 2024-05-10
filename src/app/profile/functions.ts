import { SetSnackbar } from "@/context/snackbar-context";
import { deleteCookie } from "@/hooks";
import { ApiResponse, CulturalizeApiError } from "@/protocols";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type EnrollmentPFOrPJResponse = {};

interface HandleDealWithPromiseProps {
  promise: any;
  router: AppRouterInstance;
  setSnackbar: SetSnackbar;
}

export const handleDealWithPromise = ({
  promise,
  router,
  setSnackbar,
}: HandleDealWithPromiseProps) => {
  promise
    .then((res: ApiResponse<EnrollmentPFOrPJResponse>) => {
      console.log(res);
    })
    .catch((error: CulturalizeApiError) => {
      console.log(error);
      if (error.response.status === 401) {
        deleteCookie("token");

        setSnackbar({
          message: "token de acesso expirado, faça login novamente! ",
          open: true,
          severity: "warning",
        });
        router.push("/");
      }
    });
};
