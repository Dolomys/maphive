import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === "undefined" || issue.received === "null") {
        return { message: "Ce champ est obligatoire" };
      }
      return { message: `Le type attendu est ${issue.expected}` };

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return { message: "L'adresse email n'est pas valide" };
      }
      if (issue.validation === "url") {
        return { message: "L'URL n'est pas valide" };
      }
      return { message: "La valeur n'est pas valide" };

    case z.ZodIssueCode.too_small:
      if (issue.type === "string") {
        return { message: `Le texte doit contenir au moins ${issue.minimum} caractère(s)` };
      }
      if (issue.type === "number") {
        return { message: `La valeur doit être supérieure à ${issue.minimum}` };
      }
      if (issue.type === "array") {
        return { message: `La liste doit contenir au moins ${issue.minimum} élément(s)` };
      }
      break;

    case z.ZodIssueCode.too_big:
      if (issue.type === "string") {
        return { message: `Le texte ne doit pas dépasser ${issue.maximum} caractère(s)` };
      }
      if (issue.type === "number") {
        return { message: `La valeur doit être inférieure à ${issue.maximum}` };
      }
      if (issue.type === "array") {
        return { message: `La liste ne doit pas dépasser ${issue.maximum} élément(s)` };
      }
      break;

    case z.ZodIssueCode.invalid_date:
      return { message: "La date n'est pas valide" };

    case z.ZodIssueCode.custom:
      return { message: issue.message ?? "La valeur n'est pas valide" };

    case z.ZodIssueCode.invalid_intersection_types:
      return { message: "Les types ne correspondent pas" };

    case z.ZodIssueCode.not_multiple_of:
      return { message: `Le nombre doit être un multiple de ${issue.multipleOf}` };

    case z.ZodIssueCode.not_finite:
      return { message: "Le nombre doit être fini" };
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
