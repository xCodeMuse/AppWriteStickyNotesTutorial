import { useContext } from "react";
import LoaderContext from "./Loader";

const useLoader = () => {
    const data = useContext(LoaderContext);

    return data;
};

export default useLoader;
