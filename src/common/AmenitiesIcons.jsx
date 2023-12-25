import {
  TvIcon,
  WifiIcon,
  CreditCardIcon,
  FireIcon,
  LifebuoyIcon,
  BellAlertIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

function AmenitiesIcons({ item }) {
  function renderAmenitiesIcons(item) {
    switch (item) {
      case "tv":
        return (
          <IconContainer>
            <TvIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      case "wireless_internet":
        return (
          <IconContainer>
            <WifiIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      case "safety_card":
        return (
          <IconContainer>
            <CreditCardIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      case "fire_extinguisher":
        return (
          <IconContainer>
            <FireIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      case "first_aid_kit":
        return (
          <IconContainer>
            <LifebuoyIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      case "breakfast":
        return (
          <IconContainer>
            <BellAlertIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      case "laptop_friendly_workspace":
        return (
          <IconContainer>
            <ComputerDesktopIcon className="h-5 w-5 text-indigo-950" />
          </IconContainer>
        );
      default:
        return;
    }
  }

  return renderAmenitiesIcons(item);
}

export default AmenitiesIcons;

function IconContainer({ children }) {
  return <div>{children}</div>;
}
