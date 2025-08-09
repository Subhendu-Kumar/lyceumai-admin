import { Button } from "@/components/ui/button";

const App = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button variant={"destructive"} className="cursor-pointer">
        Click me
      </Button>
    </div>
  );
};

export default App;
