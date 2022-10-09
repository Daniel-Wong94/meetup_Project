import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import styles from "./Groups.module.css";
import { useState } from "react";

const Groups = () => {
  const groups = Object.values(useSelector((state) => state?.groups));
  const [page, setPage] = useState(1);

  const totalGroups = groups?.length;
  const groupsPerPage = 3;
  const lastPage = Math.ceil(totalGroups / groupsPerPage);
  const start = (page - 1) * groupsPerPage;
  const end = page * groupsPerPage;

  const renderPages = (lastPage) => {
    const pageButtons = [];

    for (let i = 1; i <= lastPage; i++) {
      pageButtons.push(
        <button
          className={page === i && styles.active}
          value={i}
          onClick={(e) => setPage(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className={styles.groupsContainer}>
      <ul>
        {groups
          .slice(start, end)
          .map(
            (group, idx) =>
              Object.keys(group).length > 0 && (
                <GroupCard key={group.id + idx} group={group} />
              )
          )}
      </ul>
      <ul className={styles.pages}>
        <button
          disabled={page < 2}
          onClick={(e) => setPage((prevState) => prevState - 1)}
        >
          {"<"}
        </button>
        {renderPages(lastPage)}
        <button
          disabled={page === lastPage}
          onClick={(e) => setPage((prevState) => prevState + 1)}
        >
          {">"}
        </button>
      </ul>
    </div>
  );
};

export default Groups;
