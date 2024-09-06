function Loader({ text = "Fetching..." }: { text: string }) {
  return (
    <div className="h-full w-full pt-60">
      <div className="text-center relative m-auto w-fit font-semibold after:absolute after:h-[3px] after:bg-black after:-bottom-1 after:left-0 after:animate-increase-width">
        {text}
      </div>
    </div>
  );
}

export default Loader;
