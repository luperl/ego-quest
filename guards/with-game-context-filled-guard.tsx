"use client";

import {
  ComponentType,
  forwardRef,
  useEffect,
  useState,
  useContext,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { GameContext } from "@/contexts/game-context";
import { LoadingContext } from "@/contexts/loading-context";

export function withGameContextFilledGuard<P>(Component: ComponentType<P>) {
  const Guarded = forwardRef<any, P>((props, ref) => {
    const router = useRouter();
    const pathName = usePathname();
    const context = useContext(GameContext);
    const loadingContext = useContext(LoadingContext);

    const [mounted, setMounted] = useState(false);
    const [validated, setValidated] = useState(false);

    const isGameNew = pathName === "/game/new";

    useEffect(() => {
      setMounted(true);
      loadingContext?.setIsLoading(true);
    }, []);

    useEffect(() => {
      if (!mounted) return;

      if (isGameNew) {
        setValidated(true);
        loadingContext?.setIsLoading(false);
        return;
      }

      if (!context) {
        router.replace("/game/new");
        return;
      }

      const hasCards =
        Array.isArray(context.questionCards) &&
        context.questionCards.length > 0;

      if (!hasCards) {
        router.replace("/game/new");
        return;
      }

      setValidated(true);
      loadingContext?.setIsLoading(false);
    }, [mounted, isGameNew, context, pathName, router, loadingContext]);

    if (!mounted || !validated) return null;

    return <Component ref={ref} {...props} />;
  });

  Guarded.displayName = `WithGameContextFilled(${Component.displayName || Component.name})`;
  return Guarded;
}
