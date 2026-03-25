package com.example.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
//import com.example.app.Wifi;



public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Use 'Wi-fi.class' instead of 'WiFiHardware.class'
        registerPlugin(Wifi.class);
        super.onCreate(savedInstanceState);
    }
}