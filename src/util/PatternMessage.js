import { useTranslation } from "react-i18next";

export default function PatternMessage(patternType, labelName) {
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const isMatchingPattern = () => {
    if (patternType === "alphabet") {
      return t("Messages:onlyAlphabets", {label:labelName});
    }  else if (patternType === "alphaNumericWithoutSymbol") {
      return t("Messages:alphaNumericWithoutSymbol", {label:labelName});
    } else if (patternType === "number") {
      return t("Messages:onlyNumber", {label:labelName});
    } else if (patternType === "email") {
      return t("Messages:onlyEmail", {label:labelName});
    } else if (patternType === "invalid") {
      return t("Messages:invalid", {label:labelName});
    } else if (patternType === "decimal") {
      return t("Messages:onlyDecimal", {label:labelName});
    }else if (patternType === "alphanumeric") {
      return t("Messages:alphaNumericWithoutSymbol", {label:labelName});
    }
  };

  return isMatchingPattern();
}
