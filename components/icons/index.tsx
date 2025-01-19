import { FC } from "react";

interface IconProps {
  className?: string;
}

const IconWrapper: FC<IconProps & { name: string }> = ({ className, name }) => (
  <span className={`material-icons ${className || ""}`}>{name}</span>
);

export const RouletteIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="casino" />
);

export const CalculatorIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="functions" />
);

export const ColorConverterIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="palette" />
);

export const QRGeneratorIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="qr_code_2" />
);

export const UnitConverterIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="straighten" />
);

export const ImageConverterIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="image" />
);

export const MenuIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="menu" />
);

export const CloseIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="close" />
);

export const LanguageIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="language" />
);

export const ConvertIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="menu" />
);

export const CurrencyExchangeIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="currency_exchange" />
);

export const SwapIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="swap_horiz" />
);

export const ArticleGeneratorIcon: FC<IconProps> = (props) => (
  <IconWrapper {...props} name="article" />
);
