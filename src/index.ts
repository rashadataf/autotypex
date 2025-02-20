import { inferType } from './utils/types'





// TEST

const sample = {
    name: "Alice",
    age: 25,
    isAdmin: false,
    settings: { theme: "light", notifications: true },
};

console.log(inferType(sample, "UserType", true));