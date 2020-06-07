package com.chinasofti.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCTest {
	
	private static String jdbcName = "com.mysql.jdbc.Driver";
	private static String dbUrl = "jdbc:mysql://localhost:3306/db_student";
	private static String dbName = "root";
	private static String dbpassword = "123456";
	public static void main(String[] args) {
	
		// TODO Auto-generated method stub
		try {
			Class.forName(jdbcName);//通过该方法加载jdbc驱动
			System.out.println("数据库驱动加载成功");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("数据库驱动加载失败");
		} 
	/**
	 *  url a database url of the form jdbc:subprotocol:subname
		user the database user on whose behalf the connection is being made
		password the user's password

	 */
		Connection connection = null;
		try {
			connection = DriverManager.getConnection(dbUrl, dbName, dbpassword);
			System.out.println("数据库连接成功");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("数据库连接失败");
		}finally{
			try {
				connection.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
