import React, { FC } from "react";

type FilterButtonProps = {
  active: boolean;
  text: string;
  onClick: () => void;
};

const FilterButton: FC<FilterButtonProps> = ({ active, text, onClick }) => {
  return (
    <button
      style={{ color: active ? "hsl(220, 98%, 61%)" : "hsl(236, 9%, 61%)" }}
      className="button-components"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

type FilterButtonsProps = {
  toggleAll: boolean;
  toggleActive: boolean;
  toggleCompleted: boolean;
  handleFilterClick: (filter: string) => void;
};

const FilterButtons: FC<FilterButtonsProps> = ({
  toggleAll,
  toggleActive,
  toggleCompleted,
  handleFilterClick,
}) => {
  return (
    <>
      <FilterButton
        active={toggleAll}
        text="All"
        onClick={() => handleFilterClick("all")}
      />
      <FilterButton
        active={toggleActive}
        text="Active"
        onClick={() => handleFilterClick("active")}
      />
      <FilterButton
        active={toggleCompleted}
        text="Completed"
        onClick={() => handleFilterClick("completed")}
      />
    </>
  );
};

export default FilterButtons;