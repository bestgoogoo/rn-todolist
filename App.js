import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Ionicons, Fontisto } from "@expo/vector-icons";
import { styles, theme } from "./style";

const STORAGE_KEY = "@toDoList";
const PAGE_KEY = "@working";

// react animation 이용 해서 css 더 꾸미기 -> react 마스터 강의 참고

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modifyMode, setModifyMode] = useState(false);
  const [working, setWorking] = useState();
  const [toDo, setToDo] = useState("");
  const [modifiedToDo, setModifiedToDo] = useState("");
  const [toDoList, setToDoList] = useState({});
  useEffect(() => {
    loadPage();
    loadtoDoList();
  }, []);
  const loadPage = async () => {
    const page = await AsyncStorage.getItem(PAGE_KEY);
    setWorking(JSON.parse(page).working);
  };
  const reversalPage = async (bool) => {
    setWorking(bool);
    AsyncStorage.setItem(PAGE_KEY, JSON.stringify({ working: bool }));
  };
  const onChangeToDo = (payload) => setToDo(payload);
  const saveToDoList = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadtoDoList = async () => {
    const toDoList = await AsyncStorage.getItem(STORAGE_KEY);
    if (toDoList) {
      setToDoList(JSON.parse(toDoList));
    }
    return setLoading(false);
  };
  const addToDo = async () => {
    if (toDo === "") {
      return;
    }
    const newToDoList = Object.assign({}, toDoList, {
      [Date.now()]: { toDo, working, check: false, modifyMode: false },
    });
    // const newToDoList = { ...toDoList, [Date.now()]: { toDo, working, check: false, modifyMode: false } };
    setToDoList(newToDoList);
    await saveToDoList(newToDoList);
    setToDo("");
  };
  const checkout = async (key) => {
    const newToDoList = { ...toDoList };
    if (newToDoList[key].check === true) {
      newToDoList[key].check = false;
    } else {
      newToDoList[key].check = true;
    }
    setToDoList(newToDoList);
    await saveToDoList(newToDoList);
  };
  const removeToDo = (key) => {
    Alert.alert("Warning", "Remove it?", [
      { text: "Cancel" },
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          const newToDoList = { ...toDoList };
          delete newToDoList[key];
          setToDoList(newToDoList);
          await saveToDoList(newToDoList);
        },
      },
    ]);
  };
  const removeAll = () => {
    Alert.alert("Warning", "Remove All?", [
      { text: "Cancel" },
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          setToDoList({});
          await AsyncStorage.clear();
        },
      },
    ]);
  };

  const onModifyMode = (key) => {
    const newToDoList = { ...toDoList };
    newToDoList[key].modifyMode = true;
    setToDoList(newToDoList);
  };
  const onChangeModifyToDo = (payload) => setModifiedToDo(payload);
  const modifyToDo = async (key) => {
    if (modifiedToDo === "") {
      return;
    }
    const newToDoList = { ...toDoList };
    newToDoList[key].toDo = modifiedToDo;
    newToDoList[key].modifyMode = false;
    setToDoList(newToDoList);
    await saveToDoList(newToDoList);
    setModifiedToDo("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={(bool) => reversalPage(true)}>
          <Text
            style={{
              ...styles.headerBtn,
              color: working ? "white" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(bool) => reversalPage(false)}>
          <Text
            style={{
              ...styles.headerBtn,
              color: !working ? "white" : theme.grey,
            }}
          >
            Play
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeToDo}
          value={toDo}
          placeholder={working ? "What`s your plan?" : "Where do we go?"}
          style={styles.input}
        />
        <TouchableOpacity onPress={addToDo} style={styles.inputBtn}>
          <AntDesign name="enter" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView>
          {!loading ? (
            Object.keys(toDoList).map((key) =>
              toDoList[key].working === working ? (
                <View key={key}>
                  <View style={styles.toDoLine}>
                    <View>
                      <TouchableOpacity
                        style={styles.toDoPartial}
                        onPress={() => checkout(key)}
                      >
                        <Fontisto
                          name={
                            toDoList[key].check
                              ? "checkbox-active"
                              : "checkbox-passive"
                          }
                          size={18}
                          color={toDoList[key].check ? "green" : "white"}
                        />
                        <Text
                          style={
                            !toDoList[key].check
                              ? styles.toDoText
                              : styles.doneText
                          }
                        >
                          {toDoList[key].toDo}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.toDoPartial}>
                      <TouchableOpacity
                        onPress={() => onModifyMode(key)}
                        style={styles.toDoIcon}
                      >
                        <Ionicons
                          name="reload-circle-sharp"
                          size={30}
                          color="green"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.toDoIcon}
                        onPress={() => removeToDo(key)}
                      >
                        <Ionicons
                          name="remove-circle-sharp"
                          size={30}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {toDoList[key].modifyMode ? (
                    <View style={styles.modifyLine}>
                      <Ionicons
                        name="arrow-undo-outline"
                        size={24}
                        color="white"
                        style={{ transform: [{ rotate: "180deg" }] }}
                      />
                      <TextInput
                        onSubmitEditing={() => modifyToDo(key)}
                        onChangeText={onChangeModifyToDo}
                        value={toDoList[key].modifiedToDo}
                        placeholder={toDoList[key].toDo}
                        style={styles.modifyInput}
                      ></TextInput>
                      <TouchableOpacity
                        onPress={() => modifyToDo(key)}
                        style={styles.modifyBtn}
                      >
                        <Ionicons
                          name="arrow-back-circle"
                          size={26}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ) : null
            )
          ) : (
            <View>
              <ActivityIndicator
                size="large"
                color="white"
                style={{ paddingVertical: 100 }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={{ right: 30, bottom: 80, position: "absolute" }}>
        <TouchableOpacity onPress={removeAll}>
          <Fontisto name="ban" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
