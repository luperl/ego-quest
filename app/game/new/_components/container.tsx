import { Children } from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const Header = Children.toArray(children).find(
    (child: any) => child.type === Container.Header
  );
  const Main = Children.toArray(children).find(
    (child: any) => child.type === Container.Main
  );

  return (
    <>
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        {Header}
      </div>

      <main className="flex flex-col gap-4 p-4 pt-6">{Main}</main>
    </>
  );
};

Container.Header = ({ children }: { children: React.ReactNode }) => children;
Container.Main = ({ children }: { children: React.ReactNode }) => children;
