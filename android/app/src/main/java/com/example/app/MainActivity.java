package com.example.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.example.app.BlePlugin;


public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 🔥 Register BLE plugin
        registerPlugin(BlePlugin.class);
    }
}