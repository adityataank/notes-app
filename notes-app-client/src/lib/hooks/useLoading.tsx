import { useState } from "react";

type UseLoadingReturnType = [boolean, () => void, () => void];

export function useLoading(): UseLoadingReturnType {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return [loading, startLoading, stopLoading];
}
