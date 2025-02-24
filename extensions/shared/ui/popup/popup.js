import {
  availableLanguagesOsuWorld,
  setLanguage,
  getLanguage,
  systemDefaultCode,
  nativeLanguageCode,
} from "../../tools.js";

const updateTitle = () => {
  const title = chrome.runtime.getManifest().name;
  const version = " v" + chrome.runtime.getManifest().version;

  document.querySelector("#header .title").innerHTML = title;
  document.querySelector("#header .version").innerHTML = version;
};

const addSupportedLanguages = async () => {
  const selectElement = document.querySelector("#region-languages-select");
  selectElement.addEventListener("change", onLanguageUpdate);

  const optionTemplate = `<option value="$value">$name</option>`;
  let selectsHtml = "";
  selectsHtml += optionTemplate
    .replace("$value", systemDefaultCode)
    .replace("$name", "System Default");
  selectsHtml += optionTemplate
    .replace("$value", nativeLanguageCode)
    .replace("$name", "Native Language");

  const osuWorldLanguages = await availableLanguagesOsuWorld();
  for (const [key, value] of Object.entries(osuWorldLanguages)) {
    selectsHtml += optionTemplate
      .replace("$value", key)
      .replace("$name", value);
  }
  selectElement.innerHTML = selectsHtml;

  let currentValue = await getLanguage();

  selectElement.value = currentValue;
};

const onLanguageUpdate = async (event) => {
  const value = event.target.value;
  await setLanguage(value);
};

const init = () => {
  updateTitle();
  addSupportedLanguages();
};

init();
