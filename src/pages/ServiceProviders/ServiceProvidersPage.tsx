import React from "react";
import ServiceProvider from "../../Components/ServiceProvider/ServiceProvider";
import { getSp } from "../../slices/spSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function ServiceProvidersPage() {
  const companyId = useAppSelector((state) => state.user.companyId);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getSp(companyId as number));
  }, [dispatch, companyId]);

  const spList = useAppSelector(
    (state) => state.ServiceProviders.ServiceProviders
  );
  return (
    <div>
      <ServiceProvider spList={spList} />
    </div>
  );
}
