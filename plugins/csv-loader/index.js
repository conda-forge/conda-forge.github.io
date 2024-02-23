export default function (context, options) {
    return {
      name: 'csv-loader-plugin',
      configureWebpack(config, isServer, utils) {
        return {
            module: {
                rules: [
                  {
                    test: /\.csv$/,
                    loader: 'csv-loader',
                    options: {
                      dynamicTyping: true,
                      header: true,
                      skipEmptyLines: true
                    }
                  }
                ]
              }
        };
      },
    };
  }
