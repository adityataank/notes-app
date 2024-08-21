import Header from "@/components/layout-components/header";
import Notes from "@/components/layout-components/notes/notes";

function FilteredNotes() {
  return (
    <div className="h-full">
      <Header type="default" />
      <Notes />
    </div>
  );
}

export default FilteredNotes;
