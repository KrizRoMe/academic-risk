enum InterventionType {
  AUTOEVALUATION = "Autoevaluación",
  STUDY_HABITS = "Hábitos de Estudio",
  ACADEMIC_GOALS = "Objetivos Académicos",
}

type InterventionTypeCardProps = {
  type: InterventionType;
  onSelect: () => void;
};

function InterventionTypeCard({ type, onSelect }: InterventionTypeCardProps) {
  return (
    <button
      onClick={onSelect}
      className="max-w-sm cursor-pointer rounded-sm border border-stroke bg-white text-black shadow-default hover:bg-primary hover:text-white dark:border-strokedark dark:bg-strokedark dark:text-white dark:hover:bg-primary"
    >
      <div className="border-b border-stroke px-5 py-3 dark:border-strokedark">
        <h4 className="text-md font-semibold">
          <a href="#">{type}</a>
        </h4>
      </div>
    </button>
  );
}

export default InterventionTypeCard;
