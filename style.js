import { StyleSheet } from "react-native";

export const theme = {
  bg: "black",
  grey: "#3A3D40",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 30,
  },
  header: {
    marginTop: 70,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerBtn: {
    fontSize: 42,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 30,
  },
  inputBtn: {
    position: "absolute",
    right: 8,
    top: 15,
  },
  toDoLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: theme.grey,
  },
  toDoPartial: { flexDirection: "row", alignItems: "center" },
  toDoIcon: { opacity: 0.7, marginLeft: 10 },
  toDoText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  doneText: {
    marginLeft: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.5,
    textDecorationLine: "line-through",
  },
  modifyLine: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 6,
  },
  modifyInput: {
    marginLeft: 10,
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 6,
  },
  modifyBtn: {
    position: "absolute",
    right: 5,
  },
});
