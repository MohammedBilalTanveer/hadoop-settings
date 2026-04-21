import { useState } from 'react'
import './App.css'

function App() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = (code, codeId) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(codeId)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const programs = {
    hadoop: {
      title: 'Wi-Fi & Network Setup',
      description: 'Connect to Hadoop clusters and configure network distribution protocols',
      sections: [
        {
          id: 'vm-setup',
          title: 'STEP 1: Open VirtualBox',
          content: 'Open Oracle VM VirtualBox Manager\nClick New',
          code: null
        },
        {
          id: 'vm-create',
          title: 'STEP 2: Create Ubuntu Virtual Machine',
          content: 'Fill the details:\n• Name: Ubuntu-Hadoop\n• Type: Linux\n• Version: Ubuntu (64-bit)\nClick Next',
          code: null
        },
        {
          id: 'memory',
          title: 'STEP 3: Allocate Memory (RAM)',
          content: 'Minimum: 4096 MB (4 GB)\nRecommended: 6144–8192 MB (if system allows)\nClick Next',
          code: null
        },
        {
          id: 'disk',
          title: 'STEP 4: Create Virtual Hard Disk',
          content: 'Select: Create a virtual hard disk now\nClick Create\nDisk Type: VDI (VirtualBox Disk Image)\nStorage: Dynamically allocated\nDisk Size: 50 GB (important for Hadoop)',
          code: null
        },
        {
          id: 'iso',
          title: 'STEP 5: Attach Ubuntu ISO',
          content: 'Select your VM → Click Settings\nGo to Storage\nUnder Controller IDE → Click Empty\nClick the disk icon (right side)\nChoose "Choose a disk file"\nSelect your downloaded Ubuntu ISO\nClick OK',
          code: null
        },
        {
          id: 'start-install',
          title: 'STEP 6: Start Ubuntu Installation',
          content: 'Select VM\nClick Start\nUbuntu installer will load.',
          code: null
        },
        {
          id: 'install-screens',
          title: 'STEP 7: Ubuntu Installation Screens',
          content: 'Screen 1 (Welcome): Select Install Ubuntu → Click Continue\n\nScreen 2 (Keyboard): Select English (US) → Click Continue\n\nScreen 3 (Updates): Select Normal Installation → Click Continue\n\nScreen 4 (Type): Select "Erase disk and install Ubuntu" → Click Install Now\n\nScreen 5 (Time Zone): Select India → Click Continue\n\nScreen 6 (User):\n• Your name: Shilpa\n• Computer name: ubuntu-hadoop\n• Username: shilpa\n• Password: (remember this)',
          code: null
        },
        {
          id: 'wait-install',
          title: 'STEP 8: Wait for Installation',
          content: 'Takes 10–15 minutes\nAfter completion → Click Restart Now\nWhen prompted: Press Enter\nUbuntu will boot',
          code: null
        },
        {
          id: 'remove-iso',
          title: 'STEP 9: Remove ISO (IMPORTANT)',
          content: 'If Ubuntu restarts installer again:\n1. VM → Devices\n2. Optical Drives\n3. Remove Ubuntu ISO\n4. Restart VM',
          code: null
        },
        {
          id: 'terminal-verify',
          title: 'STEP 10: Open Terminal & Verify',
          content: 'Inside Ubuntu:\nPress Ctrl + Alt + T\nRun verification commands',
          code: 'ls\njava -version\njavac -version'
        },
        {
          id: 'hadoop-install-setup',
          title: 'STEP 11: Create Hadoop User',
          content: 'Create a dedicated Hadoop user and configure SSH',
          code: 'sudo adduser hadoop\nsudo usermod -aG sudo hadoop\nsu - hadoop'
        },
        {
          id: 'hadoop-ssh',
          title: 'STEP 12: Enable Passwordless SSH',
          content: 'Configure SSH for passwordless authentication',
          code: 'ssh-keygen -t rsa\ncat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys\nchmod 640 ~/.ssh/authorized_keys\nssh localhost'
        },
        {
          id: 'hadoop-download',
          title: 'STEP 13: Download Hadoop',
          content: 'Download and extract Hadoop 3.3.6 distribution',
          code: 'wget https://downloads.apache.org/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz\ntar -xvzf hadoop-3.3.6.tar.gz\nsudo mv hadoop-3.3.6 /usr/local/hadoop\nsudo chown -R hadoop:hadoop /usr/local/hadoop'
        },
        {
          id: 'hadoop-env',
          title: 'STEP 14: Set Environment Variables',
          content: 'Configure JAVA_HOME and HADOOP_HOME',
          code: 'nano ~/.bashrc\n\n# Add at the end:\nexport JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64\nexport HADOOP_HOME=/usr/local/hadoop\nexport PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin\n\nsource ~/.bashrc\nhadoop version'
        },
        {
          id: 'hadoop-config',
          title: 'STEP 15: Configure Hadoop Files',
          content: 'Edit core-site.xml configuration',
          code: 'nano core-site.xml\n\n<configuration>\n  <property>\n    <name>fs.defaultFS</name>\n    <value>hdfs://localhost:9000</value>\n  </property>\n</configuration>'
        },
        {
          id: 'hadoop-hdfs',
          title: 'STEP 16: Configure HDFS',
          content: 'Edit hdfs-site.xml for replication settings',
          code: 'nano hdfs-site.xml\n\n<configuration>\n  <property>\n    <name>dfs.replication</name>\n    <value>1</value>\n  </property>\n</configuration>'
        },
        {
          id: 'hadoop-yarn',
          title: 'STEP 17: Configure YARN',
          content: 'Edit yarn-site.xml for MapReduce shuffle',
          code: 'nano yarn-site.xml\n\n<configuration>\n  <property>\n    <name>yarn.nodemanager.aux-services</name>\n    <value>mapreduce_shuffle</value>\n  </property>\n</configuration>'
        },
        {
          id: 'hadoop-format',
          title: 'STEP 18: Format NameNode',
          content: 'Initialize the HDFS filesystem. Do this only once!',
          code: 'hdfs namenode -format'
        },
        {
          id: 'hadoop-start',
          title: 'STEP 19: Start Hadoop Services',
          content: 'Start HDFS and YARN services and verify',
          code: 'start-dfs.sh\nstart-yarn.sh\njps'
        }
      ]
    },
    mapreduce: {
      title: 'Bluetooth & Devices',
      description: 'Search and connect your data processing nodes to form a synchronous MapReduce cluster',
      sections: [
        {
          id: 'start-services',
          title: 'Step 1: Start Hadoop Services',
          content: 'Open Terminal and verify services are running',
          code: 'start-dfs.sh\nstart-yarn.sh\njps'
        },
        {
          id: 'create-dir',
          title: 'Step 2: Create Input Directory in HDFS',
          content: 'Create the working directory structure',
          code: 'mkdir hadoop_lab\nhdfs dfs -mkdir -p /wordfreq/input'
        },
        {
          id: 'create-input',
          title: 'Step 3: Create Input File (Local System)',
          content: 'Create a sample input file with data',
          code: 'nano input.txt\n\n# Content:\nhadoop is big data framework\nhadoop processes big data\nbig data is powerful'
        },
        {
          id: 'upload-file',
          title: 'Step 4: Upload File to HDFS',
          content: 'Upload the input file to HDFS and verify',
          code: 'hdfs dfs -put input.txt /wordfreq/input\nhdfs dfs -ls /wordfreq/input'
        },
        {
          id: 'write-program',
          title: 'Step 5: Write MapReduce Java Program',
          content: 'Create and write the WordCount.java program',
          code: `import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordCount {

  public static class MapperClass
      extends Mapper<Object, Text, Text, IntWritable> {

    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Context context)
        throws IOException, InterruptedException {
      
      StringTokenizer itr = new StringTokenizer(value.toString());
      while (itr.hasMoreTokens()) {
        word.set(itr.nextToken());
        context.write(word, one);
      }
    }
  }

  public static class ReducerClass
      extends Reducer<Text, IntWritable, Text, IntWritable> {

    public void reduce(Text key, Iterable<IntWritable> values,
        Context context)
        throws IOException, InterruptedException {
      
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
      }
      context.write(key, new IntWritable(sum));
    }
  }

  public static void main(String[] args) throws Exception {

    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Word Frequency Count");

    job.setJarByClass(WordCount.class);
    job.setMapperClass(MapperClass.class);
    job.setReducerClass(ReducerClass.class);

    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);

    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}`
        },
        {
          id: 'compile',
          title: 'Step 6: Compile Java Program',
          content: 'Compile the WordCount.java program',
          code: 'javac -classpath $(hadoop classpath) -d . WordCount.java\nls'
        },
        {
          id: 'create-jar',
          title: 'Step 7: Create JAR File',
          content: 'Package the compiled classes into a JAR file',
          code: 'jar -cvf wordcount.jar WordCount*.class'
        },
        {
          id: 'execute-job',
          title: 'Step 8: Execute MapReduce Job',
          content: 'Run the MapReduce job and process the input',
          code: 'hdfs dfs -rm -r /wordfreq/output\nhadoop jar wordcount.jar WordCount /wordfreq/input /wordfreq/output'
        },
        {
          id: 'view-output',
          title: 'Step 9: View Output',
          content: 'Check the final output from the MapReduce job',
          code: 'hdfs dfs -cat /wordfreq/output/part-r-00000'
        }
      ]
    },
    maxtemp: {
      title: 'Displays & Brightness',
      description: 'Analyze thermal data across temporal cycles to identify peak performance metrics',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN', code: 'start-dfs.sh\nstart-yarn.sh\njps' },
        { id: 'data', title: 'Step 2: Create Temperature Data', content: 'Create a local file with year and temperature values', code: 'nano temperature.txt\n\n# Data:\n2018,32\n2018,35\n2018,30\n2019,28\n2019,40\n2020,36\n2020,38' },
        { id: 'dir', title: 'Step 3: HDFS Directory', content: 'Create input path in HDFS', code: 'hdfs dfs -mkdir -p /maxtemp/input' },
        { id: 'upload', title: 'Step 4: Upload Data', content: 'Upload local file to HDFS', code: 'hdfs dfs -put -f temperature.txt /maxtemp/input' },
        { id: 'verify-in', title: 'Step 5: Verify Input', content: 'List HDFS input directory', code: 'hdfs dfs -ls /maxtemp/input' },
        {
          id: 'java-code', title: 'Step 6: Write MaxTemperature.java', content: 'Develop the Java MapReduce program', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class MaxTemperature {
  public static class TempMapper extends Mapper<Object, Text, Text, IntWritable> {
    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
      String[] parts = value.toString().split(",");
      String year = parts[0];
      int temp = Integer.parseInt(parts[1]);
      context.write(new Text(year), new IntWritable(temp));
    }
  }

  public static class TempReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
    public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
      int maxTemp = Integer.MIN_VALUE;
      for (IntWritable val : values) {
        maxTemp = Math.max(maxTemp, val.get());
      }
      context.write(key, new IntWritable(maxTemp));
    }
  }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Maximum Temperature");
    job.setJarByClass(MaxTemperature.class);
    job.setMapperClass(TempMapper.class);
    job.setReducerClass(TempReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}` },
        { id: 'compile', title: 'Step 7: Compile', content: 'Compile using Hadoop classpath', code: 'javac -classpath `hadoop classpath` MaxTemperature.java' },
        { id: 'jar', title: 'Step 8: Create JAR', content: 'Package into maxtemp.jar', code: 'jar cf maxtemp.jar MaxTemperature*.class' },
        { id: 'exec', title: 'Step 11: Execute', content: 'Run the Hadoop job', code: 'hdfs dfs -rm -r /maxtemp/output\nhadoop jar maxtemp.jar MaxTemperature /maxtemp/input /maxtemp/output' },
        { id: 'out', title: 'Step 12: View Results', content: 'Read the final HDFS output', code: 'hdfs dfs -cat /maxtemp/output/part-r-00000' }
      ]
    },
    grades: {
      title: 'Users & Privacy',
      description: 'Manage student credentials and evaluate academic classifications through automated grading',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize Hadoop services', code: 'start-dfs.sh\nstart-yarn.sh\njps' },
        { id: 'dir', title: 'Step 2: Workspace', content: 'Setup local grading environment', code: 'mkdir grade_lab\ncd grade_lab' },
        {
              id: 'java', title: 'Step 3: Write GradeMR.java', content: 'Develop grading logic MapReduce', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class GradeMR {
  public static class GradeMapper extends Mapper<Object, Text, Text, Text> {
    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
      String line = value.toString();
      String[] parts = line.split(",");
      String name = parts[0];
      int marks = Integer.parseInt(parts[1]);
      String grade;
      if (marks >= 80) grade = "A";
      else if (marks >= 60) grade = "B";
      else if (marks >= 50) grade = "C";
      else grade = "D";
      context.write(new Text(name), new Text(grade));
    }
  }

  public static class GradeReducer extends Reducer<Text, Text, Text, Text> {
    public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
      for (Text val : values) {
        context.write(key, val);
      }
    }
  }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Student Grade");
    job.setJarByClass(GradeMR.class);
    job.setMapperClass(GradeMapper.class);
    job.setReducerClass(GradeReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(Text.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}` },
            { id: 'compile', title: 'Step 4: Compile', content: 'Build Java binaries', code: 'javac -classpath $(hadoop classpath) -d . GradeMR.java' },
            { id: 'jar', title: 'Step 5: Create JAR', content: 'Bundle classes', code: 'jar -cvf grade.jar *' },
            { id: 'data', title: 'Step 7: Create Data', content: 'Setup students student records', code: 'nano students.txt\n\n# Data:\nRavi,85\nAnita,72\nRahul,60\nPriya,55\nKiran,90' },
            { id: 'hdfs', title: 'Step 8: Upload', content: 'Move data to HDFS', code: 'hdfs dfs -mkdir -p /grade/input\nhdfs dfs -put students.txt /grade/input' },
            { id: 'exec', title: 'Step 9: Run Job', content: 'Execute grading job', code: 'hadoop jar grade.jar GradeMR /grade/input /grade/output' },
            { id: 'out', title: 'Step 10: Results', content: 'Display results', code: 'hdfs dfs -cat /grade/output/part-r-00000' }
          ]
        },
        matrix: {
      title: 'Sound & Audio',
      description: 'Perform distributed matrix multiplication using MapReduce for large-scale linear algebra operations',
      sections: [
        { id: 'start', title: 'Step 1: Start Hadoop Services', content: 'Initialize HDFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\njps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Create a local directory for matrix operations', code: 'mkdir matrix_lab\ncd matrix_lab' },
        {
          id: 'write-java', title: 'Step 3: Write MatrixMultiply.java', content: 'Create the MapReduce Java program for matrix multiplication', code: `import java.io.IOException;
import java.util.*;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class MatrixMultiply {

  public static class MatrixMapper extends Mapper<Object, Text, Text, Text> {

    public void map(Object key, Text value, Context context)
        throws IOException, InterruptedException {

      String[] parts = value.toString().split(",");

      String matrix = parts[0];
      int row = Integer.parseInt(parts[1]);
      int col = Integer.parseInt(parts[2]);
      String val = parts[3];

      if (matrix.equals("A")) {
        for (int i = 0; i < 2; i++) {
          context.write(new Text(row + "," + i),
                        new Text("A," + col + "," + val));
        }
      } else {
        for (int i = 0; i < 2; i++) {
          context.write(new Text(i + "," + col),
                        new Text("B," + row + "," + val));
        }
      }
    }
  }

  public static class MatrixReducer extends Reducer<Text, Text, Text, Text> {

    public void reduce(Text key, Iterable<Text> values, Context context)
        throws IOException, InterruptedException {

      Map<Integer, Integer> mapA = new HashMap<>();
      Map<Integer, Integer> mapB = new HashMap<>();

      for (Text val : values) {
        String[] parts = val.toString().split(",");

        if (parts[0].equals("A")) {
          mapA.put(Integer.parseInt(parts[1]),
                   Integer.parseInt(parts[2]));
        } else {
          mapB.put(Integer.parseInt(parts[1]),
                   Integer.parseInt(parts[2]));
        }
      }

      int result = 0;

      for (int k : mapA.keySet()) {
        if (mapB.containsKey(k)) {
          result += mapA.get(k) * mapB.get(k);
        }
      }

      context.write(key, new Text(String.valueOf(result)));
    }
  }

  public static void main(String[] args) throws Exception {

    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Matrix Multiplication");

    job.setJarByClass(MatrixMultiply.class);
    job.setMapperClass(MatrixMapper.class);
    job.setReducerClass(MatrixReducer.class);

    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(Text.class);

    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}` 
        },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath $(hadoop classpath) -d . MatrixMultiply.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf matrix.jar *' },
        { id: 'hdfs-dir', title: 'Step 6: Create HDFS Input Directory', content: 'Create input path in HDFS for matrix data', code: 'hdfs dfs -mkdir -p /matrix/input' },
        { id: 'matrix-data', title: 'Step 7: Create Matrix Data File', content: 'Create local file with matrix A and B values in CSV format', code: 'nano matrix.txt\n\n# Add the following data:\nA,0,0,1\nA,0,1,2\nA,1,0,3\nA,1,1,4\nB,0,0,5\nB,0,1,6\nB,1,0,7\nB,1,1,8' },
        { id: 'upload', title: 'Step 8: Upload Matrix Data to HDFS', content: 'Copy local matrix file to HDFS', code: 'hdfs dfs -put matrix.txt /matrix/input' },
        { id: 'verify-input', title: 'Step 9: Verify Input in HDFS', content: 'Check that matrix data was uploaded successfully', code: 'hdfs dfs -ls /matrix/input' },
        { id: 'run-job', title: 'Step 10: Execute MapReduce Job', content: 'Run the matrix multiplication job', code: 'hadoop jar matrix.jar MatrixMultiply /matrix/input /matrix/output' },
        { id: 'view-result', title: 'Step 11: View Results', content: 'Display the computed output matrix', code: 'hdfs dfs -cat /matrix/output/part-r-00000' }
      ]
    },
    electricity: {
      title: 'Power & Battery',
      description: 'Harness energy optimization through distributed thermal analysis of consumption cycles',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\nJps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Set up local directory for electricity analysis', code: 'mkdir electricity_lab\ncd electricity_lab' },
        {
          id: 'write-java', title: 'Step 3: Write MaxElectricity.java', content: 'Create the MapReduce program for maximum electricity analysis', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class MaxElectricity {

  // Mapper Class
  public static class ElectricityMapper
      extends Mapper<Object, Text, Text, IntWritable> {

    public void map(Object key, Text value, Context context)
        throws IOException, InterruptedException {

      String line = value.toString();
      String[] parts = line.split(",");

      String year = parts[0];
      int consumption = Integer.parseInt(parts[2]);

      context.write(new Text(year),
                    new IntWritable(consumption));
    }
  }

  // Reducer Class
  public static class ElectricityReducer
      extends Reducer<Text, IntWritable, Text, IntWritable> {

    public void reduce(Text key, Iterable<IntWritable> values,
                       Context context)
        throws IOException, InterruptedException {

      int max = Integer.MIN_VALUE;

      for (IntWritable val : values) {
        if (val.get() > max) {
          max = val.get();
        }
      }

      context.write(key, new IntWritable(max));
    }
  }

  // Main Method
  public static void main(String[] args) throws Exception {

    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Max Electricity Consumption");

    job.setJarByClass(MaxElectricity.class);
    job.setMapperClass(ElectricityMapper.class);
    job.setReducerClass(ElectricityReducer.class);

    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);

    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}` },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath $(hadoop classpath) -d . MaxElectricity.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf electricity.jar *' },
        { id: 'hdfs-dir', title: 'Step 6: Create HDFS Input Directory', content: 'Create input path in HDFS for electricity data', code: 'hdfs dfs -mkdir -p /electricity/input' },
        {
          id: 'data', title: 'Step 7: Create Electricity Data File', content: 'Create local file with year, month, and consumption values in CSV format', code: 'nano electricity.txt\n\n# Add the following data:\n2019,Jan,200\n2019,Feb,180\n2019,Mar,220\n2020,Jan,300\n2020,Feb,250\n2020,Mar,275\n2021,Jan,400\n2021,Feb,350'
        },
        { id: 'upload', title: 'Step 8: Upload Electricity Data to HDFS', content: 'Copy local electricity file to HDFS', code: 'hdfs dfs -put electricity.txt /electricity/input' },
        { id: 'verify-input', title: 'Step 9: Verify Input in HDFS', content: 'Check that electricity data was uploaded successfully', code: 'hdfs dfs -ls /electricity/input' },
        { id: 'run-job', title: 'Step 10: Execute MapReduce Job', content: 'Run the maximum electricity consumption job', code: 'hadoop jar electricity.jar MaxElectricity /electricity/input /electricity/output' },
        { id: 'view-result', title: 'Step 11: View Results', content: 'Display the maximum electrical consumption by year', code: 'hdfs dfs -cat /electricity/output/part-r-00000' }
      ]
    },
    weather: {
      title: 'Time & Date',
      description: 'Synchronize temporal climate patterns across global coordinates and environmental cycles',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\nJps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Set up local directory for weather analysis', code: 'mkdir weather_lab\ncd weather_lab' },
        {
          id: 'write-java', title: 'Step 3: Write WeatherAnalysis.java', content: 'Create the MapReduce program for weather classification', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WeatherAnalysis {

  // Mapper Class
  public static class WeatherMapper
      extends Mapper<Object, Text, Text, Text> {

    public void map(Object key, Text value, Context context)
        throws IOException, InterruptedException {

      String line = value.toString();
      String[] parts = line.split(",");

      String date = parts[0];
      int temperature = Integer.parseInt(parts[1]);

      if (temperature >= 30) {
        context.write(new Text(date), new Text("Sunny"));
      } else {
        context.write(new Text(date), new Text("Cool"));
      }
    }
  }

  // Reducer Class
  public static class WeatherReducer
      extends Reducer<Text, Text, Text, Text> {

    public void reduce(Text key, Iterable<Text> values,
                       Context context)
        throws IOException, InterruptedException {

      for (Text val : values) {
        context.write(key, val);
      }
    }
  }

  // Main Method
  public static void main(String[] args) throws Exception {

    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Weather Analysis");

    job.setJarByClass(WeatherAnalysis.class);
    job.setMapperClass(WeatherMapper.class);
    job.setReducerClass(WeatherReducer.class);

    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(Text.class);

    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}` },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath $(hadoop classpath) -d . WeatherAnalysis.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf weather.jar *' },
        { id: 'hdfs-dir', title: 'Step 6: Create HDFS Input Directory', content: 'Create input path in HDFS for weather data', code: 'hdfs dfs -mkdir -p /weather/input' },
        {
          id: 'data', title: 'Step 7: Create Weather Data File', content: 'Create local file with date and temperature values in CSV format', code: 'nano weather.txt\n\n# Add the following data:\n01-01-2023,35\n02-01-2023,22\n03-01-2023,31\n04-01-2023,18\n05-01-2023,40'
        },
        { id: 'upload', title: 'Step 8: Upload Weather Data to HDFS', content: 'Copy local weather file to HDFS', code: 'hdfs dfs -put weather.txt /weather/input' },
        { id: 'verify-input', title: 'Step 9: Verify Input in HDFS', content: 'Check that weather data was uploaded successfully', code: 'hdfs dfs -ls /weather/input' },
        { id: 'run-job', title: 'Step 10: Execute MapReduce Job', content: 'Run the weather analysis job', code: 'hadoop jar weather.jar WeatherAnalysis /weather/input /weather/output' },
        { id: 'view-result', title: 'Step 11: View Results', content: 'Display weather classification results by date', code: 'hdfs dfs -cat /weather/output/part-r-00000' }
      ]
    },
    sales: {
      title: 'System & Storage',
      description: 'Organize transactional records and merchandise distribution across geographic boundaries',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\nJps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Set up local directory for sales analysis', code: 'mkdir sales_lab\ncd sales_lab' },
        {
          id: 'write-java', title: 'Step 3: Write CountrySales.java', content: 'Create the MapReduce program for country-wise sales count', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class CountrySales {

  // Mapper Class
  public static class SalesMapper
      extends Mapper<Object, Text, Text, IntWritable> {

    private final static IntWritable one = new IntWritable(1);
    private Text country = new Text();

    public void map(Object key, Text value, Context context)
        throws IOException, InterruptedException {

      String line = value.toString();

      // Skip header line
      if (line.startsWith("Transaction_Date"))
        return;

      String[] fields = line.split(",");

      // Country is 8th column (index 7)
      country.set(fields[7]);

      context.write(country, one);
    }
  }

  // Reducer Class
  public static class SalesReducer
      extends Reducer<Text, IntWritable, Text, IntWritable> {

    public void reduce(Text key, Iterable<IntWritable> values,
                       Context context)
        throws IOException, InterruptedException {

      int sum = 0;

      for (IntWritable val : values) {
        sum += val.get();
      }

      context.write(key, new IntWritable(sum));
    }
  }

  // Main Method
  public static void main(String[] args) throws Exception {

    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Country Product Sales Count");

    job.setJarByClass(CountrySales.class);
    job.setMapperClass(SalesMapper.class);
    job.setReducerClass(SalesReducer.class);

    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);

    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}` },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath $(hadoop classpath) -d . CountrySales.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf sales.jar *' },
        { id: 'hdfs-dir', title: 'Step 6: Create HDFS Input Directory', content: 'Create input path in HDFS for sales data', code: 'hdfs dfs -mkdir -p /sales/input' },
        {
          id: 'data', title: 'Step 7: Create Sales Data File', content: 'Create local file with transaction and customer details', code: 'nano sales.txt\n\n# Add the following data:\nTransaction_Date,Product,Price,Payment_Type,Name,City,State,Country,Account_Created,Last_Login,Latitude,Longitude\n2023-01-01,Laptop,500,Card,Ravi,Bangalore,KA,India,2022-01-01,2023-01-01,12.9,77.5\n2023-01-02,Phone,300,Cash,John,New York,NY,USA,2021-05-01,2023-01-02,40.7,-74.0\n2023-01-03,Tablet,200,Card,Asha,Delhi,DL,India,2020-03-01,2023-01-03,28.6,77.2\n2023-01-04,Laptop,600,Card,Smith,London,NA,UK,2022-07-01,2023-01-04,51.5,-0.1\n2023-01-05,Phone,250,Cash,Ramesh,Mumbai,MH,India,2021-08-01,2023-01-05,19.0,72.8'
        },
        { id: 'upload', title: 'Step 8: Upload Sales Data to HDFS', content: 'Copy local sales file to HDFS', code: 'hdfs dfs -put sales.txt /sales/input' },
        { id: 'verify-input', title: 'Step 9: Verify Input in HDFS', content: 'Check that sales data was uploaded successfully', code: 'hdfs dfs -ls /sales/input' },
        { id: 'run-job', title: 'Step 10: Execute MapReduce Job', content: 'Run the country-wise sales count job', code: 'hadoop jar sales.jar CountrySales /sales/input /sales/output' },
        { id: 'view-result', title: 'Step 11: View Results', content: 'Display sales count by country', code: 'hdfs dfs -cat /sales/output/part-r-00000' }
      ]
    },
    movies: {
      title: 'Applications',
      description: 'Discover content associations through intelligent tag aggregation and media classification systems',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\nJps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Set up local directory for movie tag analysis', code: 'mkdir movie_tags\ncd movie_tags' },
        {
          id: 'write-java', title: 'Step 3: Write MovieTags.java', content: 'Create the MapReduce program for aggregating movie tags', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class MovieTags {

    // Mapper Class
    public static class TagMapper extends Mapper<Object, Text, Text, Text> {

        private Text movieId = new Text();
        private Text tag = new Text();

        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException {

            String line = value.toString();

            // Skip header
            if (line.contains("userId")) return;

            String[] fields = line.split(",");

            if (fields.length >= 3) {
                movieId.set(fields[1]);   // movieId
                tag.set(fields[2]);       // tag
                context.write(movieId, tag);
            }
        }
    }

    // Reducer Class
    public static class TagReducer extends Reducer<Text, Text, Text, Text> {

        public void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException {

            StringBuilder tagList = new StringBuilder();

            for (Text val : values) {
                if (tagList.length() > 0)
                    tagList.append(",");
                tagList.append(val.toString());
            }

            context.write(key, new Text(tagList.toString()));
        }
    }

    // Driver Class
    public static void main(String[] args) throws Exception {

        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Movie Tags");

        job.setJarByClass(MovieTags.class);

        job.setMapperClass(TagMapper.class);
        job.setReducerClass(TagReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}` },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath $(hadoop classpath) -d . MovieTags.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf movietags.jar *' },
        {
          id: 'data', title: 'Step 6: Create Movie Tags Data File', content: 'Create local file with MovieLens tag data in CSV format', code: 'nano tags.csv\n\n# Add the following data:\nuserId,movieId,tag,timestamp\n2,60756,funny,1445714994\n2,60756,Highly entertaining,1445714996\n2,89774,action,1445715200\n3,60756,comedy,1445715300\n4,89774,thriller,1445715400\n5,60756,drama,1445715500'
        },
        { id: 'hdfs-dir', title: 'Step 7: Create HDFS Directory and Upload', content: 'Create HDFS path and upload movie data', code: 'hdfs dfs -mkdir /moviedata\nhdfs dfs -put tags.csv /moviedata' },
        { id: 'verify-input', title: 'Step 8: Verify Input in HDFS', content: 'Check that movie tags data was uploaded successfully', code: 'hdfs dfs -ls /moviedata' },
        { id: 'run-job', title: 'Step 9: Execute MapReduce Job', content: 'Run the movie tags aggregation job', code: 'hadoop jar movietags.jar MovieTags /moviedata /movieoutput' },
        { id: 'view-result', title: 'Step 10: View Results', content: 'Display aggregated tags for each movie', code: 'hdfs dfs -cat /movieoutput/part-r-00000' }
      ]
    },
    books: {
      title: 'Accessibility',
      description: 'Chronicle publication patterns through temporal archive analysis and content frequency metrics',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\njps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Set up local directory for book analysis', code: 'mkdir books_lab\ncd books_lab' },
        {
          id: 'write-java', title: 'Step 3: Write BookYearFrequency.java', content: 'Create the MapReduce program for book publication frequency analysis', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class BookYearFrequency {

    // Mapper Class
    public static class YearMapper extends Mapper<Object, Text, Text, IntWritable> {

        private Text year = new Text();
        private IntWritable one = new IntWritable(1);

        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException {

            String line = value.toString();

            if(line.contains("Title")) return; // Skip header

            String[] fields = line.split(",");

            if(fields.length >= 3) {
                year.set(fields[2]); // Year column
                context.write(year, one);
            }
        }
    }

    // Reducer Class
    public static class YearReducer extends Reducer<Text, IntWritable, Text, IntWritable> {

        int maxCount = 0;
        String maxYear = "";

        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {

            int sum = 0;

            for(IntWritable val : values) {
                sum += val.get();
            }

            context.write(key, new IntWritable(sum));

            if(sum > maxCount) {
                maxCount = sum;
                maxYear = key.toString();
            }
        }

        protected void cleanup(Context context)
                throws IOException, InterruptedException {

            context.write(new Text("Maximum books published in: " + maxYear),
                    new IntWritable(maxCount));
        }
    }

    // Driver Code
    public static void main(String[] args) throws Exception {

        Configuration conf = new Configuration();

        Job job = Job.getInstance(conf, "Book Year Frequency");

        job.setJarByClass(BookYearFrequency.class);

        job.setMapperClass(YearMapper.class);
        job.setReducerClass(YearReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}` },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath `hadoop classpath` -d . BookYearFrequency.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf bookyear.jar *' },
        { id: 'hdfs-dir', title: 'Step 6: Create HDFS Directory', content: 'Create HDFS path for book data', code: 'hdfs dfs -mkdir /bookdata' },
        {
          id: 'data', title: 'Step 7: Create Book Data File', content: 'Create local file with book publication details in CSV format', code: 'nano books.csv\n\n# Add the following data:\nTitle,AuthorPublished,Year,Author,Country,Language,Pages\nBookA,2018,2018,John,USA,English,250\nBookB,2019,2019,Smith,UK,English,300\nBookC,2018,2018,Ravi,India,English,200\nBookD,2020,2020,Lee,China,Chinese,320\nBookE,2019,2019,Kumar,India,Hindi,280\nBookF,2018,2018,Ana,Brazil,Portuguese,210'
        },
        { id: 'upload', title: 'Step 8: Upload Book Data to HDFS', content: 'Copy local book file to HDFS', code: 'hdfs dfs -put books.csv /bookdata' },
        { id: 'verify-input', title: 'Step 9: Verify Input in HDFS', content: 'Check that book data was uploaded successfully', code: 'hdfs dfs -ls /bookdata' },
        { id: 'run-job', title: 'Step 10: Execute MapReduce Job', content: 'Run the book year frequency analysis job', code: 'hadoop jar bookyear.jar BookYearFrequency /bookdata /bookoutput' },
        { id: 'view-result', title: 'Step 11: View Results', content: 'Display book publishing frequency by year and maximum year', code: 'hdfs dfs -cat /bookoutput/part-r-00000' }
      ]
    },
    uber: {
      title: 'Location Services',
      description: 'Track mobility metrics across distributed service platforms and transportation demand cycles',
      sections: [
        { id: 'start', title: 'Step 1: Start Services', content: 'Initialize DFS and YARN services', code: 'start-dfs.sh\nstart-yarn.sh\nJps' },
        { id: 'mkdir', title: 'Step 2: Create Working Directory', content: 'Set up local directory for Uber data analysis', code: 'mkdir uber_lab\ncd uber_lab' },
        {
          id: 'write-java', title: 'Step 3: Write UberTrips.java', content: 'Create the MapReduce program for Uber trip analysis', code: `import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class UberTrips {

    // Mapper
    public static class UberMapper
        extends Mapper<Object, Text, Text, IntWritable>{

        private Text baseDate = new Text();

        public void map(Object key, Text value, Context context)
            throws IOException, InterruptedException {

            String line = value.toString();
            String fields[] = line.split(",");

            String base = fields[0];
            String date = fields[1];
            int trips = Integer.parseInt(fields[3]);

            baseDate.set(base + " " + date);

            context.write(baseDate, new IntWritable(trips));
        }
    }

    // Reducer
    public static class UberReducer
        extends Reducer<Text, IntWritable, Text, IntWritable>{

        public void reduce(Text key, Iterable<IntWritable> values,
            Context context) throws IOException, InterruptedException {

            int sum = 0;

            for(IntWritable val : values){
                sum += val.get();
            }

            context.write(key, new IntWritable(sum));
        }
    }

    // Driver Class
    public static void main(String[] args) throws Exception {

        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Uber Trips Analysis");

        job.setJarByClass(UberTrips.class);
        job.setMapperClass(UberMapper.class);
        job.setReducerClass(UberReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        FileInputFormat.addInputPath(job,new Path(args[0]));
        FileOutputFormat.setOutputPath(job,new Path(args[1]));

        System.exit(job.waitForCompletion(true)?0:1);
    }
}` },
        { id: 'compile', title: 'Step 4: Compile Java Program', content: 'Compile with Hadoop classpath', code: 'javac -classpath $(hadoop classpath) -d . UberTrips.java' },
        { id: 'jar', title: 'Step 5: Create JAR File', content: 'Package compiled classes into JAR', code: 'jar -cvf uber.jar *' },
        {
          id: 'data', title: 'Step 6: Create Uber Data File', content: 'Create local file with dispatching base, date, active vehicles, and trips data in CSV format', code: 'nano uber.txt\n\n# Columns: dispatching_base_number, date, active_vehicles, trips\n# Add the following data:\nB02512,2014-04-01,190,1132\nB02512,2014-04-02,210,1200\nB02598,2014-04-01,150,980\nB02598,2014-04-02,170,1050\nB02617,2014-04-01,180,1100'
        },
        { id: 'hdfs-dir', title: 'Step 7: Create HDFS Input Directory', content: 'Create input path in HDFS for Uber data', code: 'hdfs dfs -mkdir -p /uber/input' },
        { id: 'upload', title: 'Step 8: Upload Uber Data to HDFS', content: 'Copy local Uber file to HDFS', code: 'hdfs dfs -put uber.txt /uber/input' },
        { id: 'verify-input', title: 'Step 9: Verify Input in HDFS', content: 'Check that Uber data was uploaded successfully', code: 'hdfs dfs -ls /uber/input' },
        { id: 'run-job', title: 'Step 10: Execute MapReduce Job', content: 'Run the Uber trips analysis job', code: 'hadoop jar uber.jar UberTrips /uber/input /uber/output' },
        { id: 'view-result', title: 'Step 11: View Results', content: 'Display trips count by base and date', code: 'hdfs dfs -cat /uber/output/part-r-00000' }
      ]
    },
    spark: {
      title: 'Background Processes',
      description: 'Execute parallel computation workflows for accelerated analytics and in-memory data transformation',
      sections: [
        { id: 'install-python', title: 'Step 1: Update System and Install Python3', content: 'Update package manager and install Python3 with pip', code: 'sudo apt update\n\nsudo apt install python3-pip -y' },
        { id: 'venv', title: 'Step 2: Create and Activate Virtual Environment', content: 'Set up Python virtual environment for Spark', code: 'sudo apt install python3-venv -y\n\n# Create a virtual environment\npython3 -m venv spark_env\n\n# Activate virtual environment\nsource spark_env/bin/activate' },
        { id: 'install-spark', title: 'Step 3: Install PySpark', content: 'Install Apache Spark Python library', code: 'pip install pyspark' },
        {
          id: 'create-input', title: 'Step 4: Create Input Data File', content: 'Create a local text file with sample data', code: 'nano input.txt\n\n# Add the following data:\nhello world hello spark hadoop'
        },
        {
          id: 'write-python', title: 'Step 5: Write WordCount Python Program', content: 'Create PySpark word count application', code: `nano wordcount.py

# Add the following python code:
from pyspark import SparkContext

sc = SparkContext("local", "WordCount")

# Read file
data = sc.textFile("input.txt")

# Split into words
words = data.flatMap(lambda line: line.split(" "))

# Create (word,1)
pairs = words.map(lambda word: (word, 1))

# Count words
counts = pairs.reduceByKey(lambda a, b: a + b)

# Save output
counts.saveAsTextFile("output")` },
        { id: 'submit', title: 'Step 6: Submit Spark Job', content: 'Execute the PySpark word count application', code: 'spark-submit wordcount.py' },
        { id: 'view-output', title: 'Step 7: View Results', content: 'Display the word count output', code: 'cat output/part-00000' }
      ]
    },
    }

  const currentProgram = selectedProgram ? programs[selectedProgram] : null

  // --- GRID VIEW (HOME) ---
  if(!selectedProgram) {
      return (
        <div className="min-h-screen bg-[#111111] text-gray-100 selection:bg-orange-500/30">
          {/* Navigation Bar */}
          <nav className="glass-header sticky top-0 z-50 px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-lg">U</div>
                <h1 className="text-xl font-bold tracking-tight">Ubuntu Settings</h1>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
                <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                <span className="hover:text-white cursor-pointer transition-colors">Resources</span>
                <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-full font-medium transition-all">
                  v1.0.4
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-8 pt-16 pb-12">
            <div className="animate-slide-up">
              <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                System Settings
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Configure your environment and manage big data services through the system control panel.
              </p>
            </div>
          </div>

          {/* Grid Container */}
          <div className="max-w-7xl mx-auto px-8 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(programs).map(([key, program], idx) => (
                <button
                  key={key}
                  onClick={() => setSelectedProgram(key)}
                  className={`animate-slide-up group text-left relative overflow-hidden`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="h-64 glass rounded-[2rem] p-8 hover-card border-none ring-1 ring-white/10 hover:ring-orange-500/50 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {program.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 group-hover:translate-x-1 transition-transform">
                      GET STARTED
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

  // --- DETAIL VIEW (PROGRAM PAGE) ---
  return(
    <div className = "min-h-screen bg-[#111111] text-gray-100" >
        {/* Detail Header */ }
        < div className = "glass-header sticky top-0 z-50" >
          <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all border border-white/5"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">MODULE</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">{selectedProgram}</span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">{currentProgram.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {currentProgram.sections.some(s => s.code && (s.id.includes('program') || s.id.includes('write'))) && (
                <button
                  onClick={() => {
                    const fullCode = currentProgram.sections
                      .filter(s => s.code)
                      .map(s => s.code)
                      .join('\n\n');
                    copyToClipboard(fullCode, 'full-program');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${copiedCode === 'full-program'
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copiedCode === 'full-program' ? 'COPIED FULL CODE' : 'COPY FULL PROGRAM'}
                </button>
              )}
            </div>
          </div>
      </div >

    {/* Detail Content */ }
    < div className = "max-w-5xl mx-auto p-8 animate-slide-up" >
      <div className="space-y-12">
        {currentProgram.sections.map((section, index) => (
          <div key={section.id} className="relative pl-12">
            {/* Vertical Timeline Line */}
            {index !== currentProgram.sections.length - 1 && (
              <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/50 to-transparent"></div>
            )}

            {/* Step Number Circle */}
            <div className="absolute left-0 top-1 w-11 h-11 bg-[#111111] ring-2 ring-orange-500/50 flex items-center justify-center rounded-full z-10">
              <span className="text-sm font-bold text-orange-500">{index + 1}</span>
            </div>

            {/* Box Content */}
            <div className="pb-12">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{section.title}</h3>

              {section.content && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-6">
                  <p className="text-gray-400 whitespace-pre-line text-[15px] leading-7">
                    {section.content}
                  </p>
                </div>
              )}

              {section.code && (
                <div className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                    {/* Code Header */}
                    <div className="flex items-center justify-between px-6 py-3 bg-[#1a1a1a] border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                        </div>
                        <span className="ml-4 text-[10px] font-black tracking-widest text-gray-500 uppercase">
                          {section.id.includes('program') || section.id.includes('write') ? 'Java Class' : 'Bash Executable'}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(section.code, section.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${copiedCode === section.id
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={copiedCode === section.id ? "M5 13l4 4L19 7" : "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"} />
                        </svg>
                        {copiedCode === section.id ? 'COPIED' : 'COPY'}
                      </button>
                    </div>
                    <pre className="p-6 text-gray-300 text-[13px] leading-6 overflow-x-auto font-mono scrollbar-none">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

  {/* Footer */ }
  <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-xs font-medium tracking-widest uppercase">
    End of Instructions • Big Data Analytics Laboratory
  </div>
      </div >
    </div >
  )
}

export default App


