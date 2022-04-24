export const join = (req, res) => res.send("Join");
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const remove = (req, res) => res.send("remove User");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");