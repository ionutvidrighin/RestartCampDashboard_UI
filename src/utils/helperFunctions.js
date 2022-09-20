import { permissionConstants } from "../constants/userPermissions"
import adminIcon from "../assets/access-icons/admin.png";
import trainerIcon from "../assets/access-icons/trainer.png";
import marketingIcon from "../assets/access-icons/marketing.png";
import analyticsIcon from "../assets/access-icons/analytics.png";
import emailAdminIcon from "../assets/access-icons/email.png";

export const capitalizeWord = (string) => {
  return string && string[0].toUpperCase() + string.slice(1)
}

export const doesUserHavePermission = (pageRoute, userPagesPermission) => {
  pageRoute = pageRoute.substring(1)
  const userPagesAccess = userPagesPermission.map(page => page.name)
  
  return userPagesAccess.includes(pageRoute)
}

export const isAdmin = (userAccess) => {
  return userAccess === permissionConstants.ADMIN
}

export const isAnalytics = (userAccess) => {
  return userAccess === permissionConstants.ANALYTICS
}

export const isEmailsAdmin = (userAccess) => {
  return userAccess === permissionConstants.EMAILS_ADMINISTRATOR
}

export const isMarketing = (userAccess) => {
  return userAccess === permissionConstants.MARKETING
}

export const isTrainer = (userAccess) => {
  return userAccess === permissionConstants.TRAINER
}

export const displayAccountTypeIcon = (userAccess) => {
  let iconSrc
  switch(userAccess) {
    case permissionConstants.ADMIN:
      iconSrc = adminIcon
    break;
    case permissionConstants.TRAINER:
      iconSrc = trainerIcon
    break;
    case permissionConstants.MARKETING:
      iconSrc = marketingIcon
    break;
    case permissionConstants.ANALYTICS:
      iconSrc = analyticsIcon
    break;
    case permissionConstants.EMAILS_ADMINISTRATOR:
      iconSrc = emailAdminIcon
    break;
    default:
      iconSrc = null
  }

  return iconSrc
}