function Note() {
  return (
    <div className={`bg-gray-100 rounded-2xl mb-4 py-4 px-4 cursor-pointer drop-shadow`}>
      <div className="vertical-ellipsis">
        <h3 className="text-base font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {`{title}`}
        </h3>
        <p className="text-sm font-medium">
          {`{content}`}
        </p>
      </div>
    </div>
  );
}

export default Note;
