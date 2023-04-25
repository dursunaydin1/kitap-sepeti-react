// React kütüphanesinden gerekli bileşenler ve bağlam oluşturmak için createContext fonksiyonu import edilir
import React, { createContext, useState, useEffect, useContext } from "react";

// Bir tema bağlamı oluşturulur
const ThemeContext = createContext();

// Tema sağlayıcısı bileşeni oluşturulur. Tema durumunu yönetmek için useState ve useEffect kancaları kullanılır
const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  ); // useState ile tema durumu tutulur. Eğer yerel depolama da bir tema durumu varsa, bu durum alınır. Aksi takdirde, varsayılan olarak false kullanılır

  // useEffect ile tema durumu değiştiğinde yerel depolama güncellenir
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const setThemeMode = (mode) => setTheme(mode); // setThemeMode fonksiyonu ile tema durumu değiştirilir

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {props.children} {/* Bu bileşenin altındaki bileşenleri tutar */}
    </ThemeContext.Provider>
  );
};

// Tema durumunu kullanmak için özel bir kancası vardır
const useThemeHook = () => {
  const { theme } = useContext(ThemeContext); // useContext ile ThemeContext bağlamından tema durumu alınır
  return [theme]; // Tema durumu bir dizi olarak döndürülür
};

// Diğer bileşenler tarafından kullanılmak üzere bileşenler ve kancalar dışa aktarılır
export { ThemeProvider, ThemeContext, useThemeHook };
