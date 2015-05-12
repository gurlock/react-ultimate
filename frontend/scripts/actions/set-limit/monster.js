// IMPORTS =========================================================================================
import filter from "lodash.filter";
import sortBy from "lodash.sortby";
import {recalculatePaginationWithLimit} from "frontend/helpers/pagination";
import state, {MONSTER} from "frontend/state";
import router from "frontend/router";

// ACTIONS =========================================================================================
export default function setLimit(newLimit=MONSTER.LIMIT) {
  console.debug(`setLimit(${newLimit})`);

  let cursor = state.select("monsters");
  let limit = cursor.get("limit");
  let pagination = cursor.get("pagination");

  if (newLimit != limit) {
    cursor.set("limit", newLimit);
    let newPagination = recalculatePaginationWithLimit(
      pagination, newLimit
    );
    cursor.set("pagination", newPagination);
    state.commit();
  }

  return newLimit;
}