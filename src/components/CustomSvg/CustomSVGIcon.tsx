import AcceptMaterail from "@src/assets/dashboardIcons/AcceptMaterail";
import CertifiedMaterialsSVG from "@src/assets/dashboardIcons/CertifiedMaterialsSVG";
import CollectSVG from "@src/assets/dashboardIcons/CollectSVG";
import CustomerHistorySVG from "@src/assets/dashboardIcons/CustomerHistorySVG";
import ProcessSVG from "@src/assets/dashboardIcons/ProcessSVG";
import ReceiveSVG from "@src/assets/dashboardIcons/ReceiveSVG";
import RecyclerHistorySVG from "@src/assets/dashboardIcons/RecyclerHistorySVG";
import SupplyMaterialSVG from "@src/assets/dashboardIcons/SupplyMaterialSVG";
import SupplySVG from "@src/assets/dashboardIcons/SupplySVG";
import TrendSVG from "@src/assets/dashboardIcons/TrendSVG";
import WeightConfirmationSVG from "@src/assets/dashboardIcons/WeightConfirmationSVG";
import CollectedSVG from "@src/assets/dashboardStat/CollectedSVG";
import ProcessedSVG from "@src/assets/dashboardStat/ProcessedSVG";
import SuppliedSVG from "@src/assets/dashboardStat/SuppliedSVG";
import ToBeConfirmedSVG from "@src/assets/dashboardStat/ToBeConfirmedSVG";
import ToBeSuppliedSVG from "@src/assets/dashboardStat/ToBeSuppliedSVG";
import UserSVG from "@src/assets/dashboardStat/UserSVG";
import WastageSVG from "@src/assets/dashboardStat/WastageSVG";
import AcceptedHistorySVGIcon from "@src/assets/HistoryIcons/AcceptedHistorySVGIcon";
import CollectionAgentHistorySVGIcon from "@src/assets/HistoryIcons/CollectionAgentHistorySVGIcon";
import ProcessingHistorySVGIcon from "@src/assets/HistoryIcons/ProcessingHistorySVGIcon";
import SuppliedHistorySVGIcon from "@src/assets/HistoryIcons/SuppliedHistorySVGIcon";
import StepOneSVGIcon from "@src/assets/Howitworks/StepOneSVGIcon";
import StepThreeSVGIcon from "@src/assets/Howitworks/StepThreeSVGIcon";
import StepTwoSVGIcon from "@src/assets/Howitworks/StepTwoSVGIcon";
import FirstSvg from "@src/assets/onBoardingImages/FirstSvg";
import SecondSvg from "@src/assets/onBoardingImages/SecondSvg";
import ThirdSvg from "@src/assets/onBoardingImages/ThirdSvg";
import BankSVG from "@src/assets/paymentSvg/BankSVG";
import WalletSVG from "@src/assets/paymentSvg/WalletSVG";
import HistorySvgIcon from "@src/assets/tabIcons/HistorySvgIcon";
import StocksSvgIcon from "@src/assets/tabIcons/StocksSvgIcon";
import { colors } from "@src/globals/colors";

const components: any = {
  collect: CollectSVG,
  process: ProcessSVG,
  supply: SupplySVG,
  receive: ReceiveSVG,
  history: HistorySvgIcon,
  stocksSvg: StocksSvgIcon,
  firstSvg: FirstSvg,
  secondSvg: SecondSvg,
  thirdSvg: ThirdSvg,
  collected: CollectedSVG,
  userName: UserSVG,
  processed: ProcessedSVG,
  supplied: SuppliedSVG,
  tobeConfirmed: ToBeConfirmedSVG,
  tobeSupplied: ToBeSuppliedSVG,
  wastage: WastageSVG,
  acceptMaterail: AcceptMaterail,
  acceptedMaterialHistory: AcceptedHistorySVGIcon,
  processingHistory: ProcessingHistorySVGIcon,
  suppliedHistroy: SuppliedHistorySVGIcon,
  collectionAgentHistory: CollectionAgentHistorySVGIcon,
  weightConfirmation: WeightConfirmationSVG,
  certifiedMaterialsSVG: CertifiedMaterialsSVG,
  recyclerHistorySVG: RecyclerHistorySVG,
  trendSVG: TrendSVG,
  customerHistorySVG: CustomerHistorySVG,
  supplyMaterialSVG: SupplyMaterialSVG,
  walletSVG: WalletSVG,
  bankSVG: BankSVG,
  stepOneSVGIcon: StepOneSVGIcon,
  stepTwoSVGIcon: StepTwoSVGIcon,
  stepThreeSVGIcon: StepThreeSVGIcon,
};
export const CustomIcon = (
  iconName: any,
  size?: any,
  color = colors.primary
) => {
  const IconComponent = components[iconName];
  return <IconComponent color={color} size={size} />;
};
