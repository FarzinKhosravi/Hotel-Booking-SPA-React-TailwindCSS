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
            <TvIcon className="amenitiesIcon" />
          </IconContainer>
        );
      case "wireless_internet":
        return (
          <IconContainer>
            <WifiIcon className="amenitiesIcon" />
          </IconContainer>
        );
      case "safety_card":
        return (
          <IconContainer>
            <CreditCardIcon className="amenitiesIcon" />
          </IconContainer>
        );
      case "fire_extinguisher":
        return (
          <IconContainer>
            <FireIcon className="amenitiesIcon" />
          </IconContainer>
        );
      case "first_aid_kit":
        return (
          <IconContainer>
            <LifebuoyIcon className="amenitiesIcon" />
          </IconContainer>
        );
      case "breakfast":
        return (
          <IconContainer>
            <BellAlertIcon className="amenitiesIcon" />
          </IconContainer>
        );
      case "laptop_friendly_workspace":
        return (
          <IconContainer>
            <ComputerDesktopIcon className="amenitiesIcon" />
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
