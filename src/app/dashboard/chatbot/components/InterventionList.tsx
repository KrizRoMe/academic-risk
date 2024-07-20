function InterventionList() {
  return (
    <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
      {[
        {
          name: "Autoevaluación",
          message: "I cam across your profile and...",
        },
        {
          name: "Hábitos de Estudio",
          message: "I like your confidence 💪",
        },
        {
          name: "Objetivos Académicos",
          message: "Can you share your offer?",
          imgSrc: "/images/user/user-05.png",
        },
        {
          name: "Autoevaluación",
          message: "I cam across your profile and...",
        },
        {
          name: "Hábitos de Estudio",
          message: "I like your confidence 💪",
        },
        {
          name: "Objetivos Académicos",
          message: "Can you share your offer?",
          imgSrc: "/images/user/user-05.png",
        },
        {
          name: "Autoevaluación",
          message: "I cam across your profile and...",
        },
        {
          name: "Hábitos de Estudio",
          message: "I like your confidence 💪",
        },
        {
          name: "Objetivos Académicos",
          message: "Can you share your offer?",
          imgSrc: "/images/user/user-05.png",
        },
      ].map((user, index) => (
        <div
          key={index}
          className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark"
        >
          <div className="w-full">
            <h5 className="text-sm font-medium text-black dark:text-white">
              {user.name}
            </h5>
            <p className="text-sm">{user.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InterventionList;
