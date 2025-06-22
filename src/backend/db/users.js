import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "soeung",
    lastName: "bonna",
    email: "soeungbonna@gmail.com",
    password: "soeungbonna",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
