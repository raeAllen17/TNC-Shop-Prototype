import {
  BadgePercent, BatteryCharging, BatteryFull, Box, Cable, Calculator, CircuitBoard,
  Code2, Copy, Cpu, DatabaseBackup, Fan, Flame, FlaskConical, Gamepad2, Gauge,
  HardDrive, Headphones, HeartHandshake, Keyboard, Laptop, LayoutTemplate, Link2,
  List, MapPin, MemoryStick, Microchip, Monitor, Mouse, Network, Newspaper,
  Package, PanelBottom, PenTool, PlugZap, Presentation, Printer,
  RectangleHorizontal, Rocket, Router, Search, ShieldCheck, Smartphone, Sparkles,
  Speaker, Tablet, TabletSmartphone, Tag, Tags, Unlink, Usb, WalletCards, Webcam,
  Wifi, Wrench,
} from 'lucide-react';

const icons = {
  BadgePercent, BatteryCharging, BatteryFull, Box, Cable, Calculator, CircuitBoard,
  Code2, Copy, Cpu, DatabaseBackup, Fan, Flame, FlaskConical, Gamepad2, Gauge,
  Gpu: Microchip, HardDrive, Headphones, HeartHandshake, Keyboard, Laptop,
  LayoutTemplate, Link2, List, MapPin, MemoryStick, Monitor, Mouse, Network,
  Newspaper, Package, PanelBottom, PenTool, PlugZap, Presentation, Printer,
  RectangleHorizontal, Rocket, Router, Search, ShieldCheck, Smartphone, Sparkles,
  Speaker, Tablet, TabletSmartphone, Tag, Tags, Unlink, Usb, WalletCards, Webcam,
  Wifi, Wrench,
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.8, ...props }) {
  const Component = icons[name] || Cpu;
  return <Component size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
